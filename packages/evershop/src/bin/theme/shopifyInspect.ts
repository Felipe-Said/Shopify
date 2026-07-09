#!/usr/bin/env node
/* eslint-disable no-console */

import path from 'path';
import kleur from 'kleur';
import { readShopifyTheme } from '../../lib/shopify-theme/readShopifyTheme.js';

const themePath = process.argv[3] || process.argv[2];

if (!themePath || themePath === 'theme:shopify:inspect') {
  console.error(
    kleur.red(
      'Usage: npm run theme:shopify:inspect -- ./themes/my-shopify-theme'
    )
  );
  process.exit(1);
}

const manifest = await readShopifyTheme(path.resolve(process.cwd(), themePath));

console.log(
  kleur.bold(`Shopify theme manifest for ${kleur.cyan(manifest.rootPath)}`)
);
console.log(`Valid: ${manifest.valid ? kleur.green('yes') : kleur.red('no')}`);
console.log(`Files: ${manifest.files.length}`);
console.log(`Templates: ${manifest.templates.length}`);
console.log(`Sections: ${manifest.sections.length}`);
console.log(`Snippets: ${manifest.snippets.length}`);
console.log(`Locales: ${manifest.locales.length}`);

if (manifest.errors.length > 0) {
  console.log(kleur.red('\nErrors'));
  manifest.errors.forEach((message) => console.log(`- ${message}`));
}

if (manifest.warnings.length > 0) {
  console.log(kleur.yellow('\nWarnings'));
  manifest.warnings.forEach((message) => console.log(`- ${message}`));
}

if (manifest.valid) {
  console.log(
    kleur.green(
      '\nTheme structure is readable. Rendering still requires the Cartify Shopify Liquid adapter.'
    )
  );
}
