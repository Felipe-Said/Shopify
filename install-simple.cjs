const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const semver = require('semver');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'evershop'
});

async function runMigrations() {
  console.log('Running migrations...');
  
  // Create migration table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migration (
      id SERIAL PRIMARY KEY,
      module VARCHAR(100) NOT NULL,
      version VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(module, version)
    )
  `);
  
  const modulesPath = './packages/evershop/src/modules';
  const modules = fs.readdirSync(modulesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({
      name: dirent.name,
      path: path.resolve(modulesPath, dirent.name)
    }));
  
  for (const mod of modules) {
    const migrationPath = path.resolve(mod.path, 'migration');
    if (!fs.existsSync(migrationPath)) continue;
    
    const files = fs.readdirSync(migrationPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.match(/^Version-[0-9]+\.[0-9]+\.[0-9]+\.js$/))
      .map(dirent => dirent.name.replace('Version-', '').replace('.js', ''))
      .sort((a, b) => semver.lt(a, b) ? -1 : 1);
    
    for (const version of files) {
      const result = await pool.query(
        'SELECT version FROM migration WHERE module = $1 AND version = $2',
        [mod.name, version]
      );
      
      if (result.rows.length > 0) {
        console.log(`  Skipping ${mod.name} ${version} (already applied)`);
        continue;
      }
      
      console.log(`  Running migration ${mod.name} ${version}...`);
      
      try {
        const migration = await import(path.resolve(migrationPath, `Version-${version}.js`));
        await migration.default(pool);
        await pool.query(
          'INSERT INTO migration (module, version) VALUES ($1, $2)',
          [mod.name, version]
        );
        console.log(`  ✓ ${mod.name} ${version}`);
      } catch (e) {
        console.error(`  ✗ ${mod.name} ${version}: ${e.message}`);
      }
    }
  }
  
  console.log('Migrations complete!');
}

async function createAdmin() {
  console.log('Creating admin user...');
  
  const bcrypt = require('bcrypt');
  const password = await bcrypt.hash('admin', 10);
  
  await pool.query(`
    INSERT INTO admin_user (email, password, full_name)
    VALUES ('admin@evershop.com', $1, 'Admin')
    ON CONFLICT (email) DO UPDATE SET password = $1
  `, [password]);
  
  console.log('Admin user created: admin@evershop.com / admin');
}

async function main() {
  try {
    await runMigrations();
    await createAdmin();
    console.log('\n✓ Installation complete!');
    console.log('Run: npm run dev');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await pool.end();
  }
}

main();
