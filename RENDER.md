# Deploy on Render with Supabase

This project can run on Render, but Supabase's direct database host can resolve to IPv6.
Render services may not be able to reach that address, causing errors like:

```text
connect ENETUNREACH ...:5432 - Local (::0)
```

Use the Supabase Connection Pooler instead of the direct database host.

## Render service

Use these commands:

```bash
npm install
npm run compile:db
npm run compile
npm run build
```

Start command:

```bash
npm run start
```

The app already reads Render's `PORT` environment variable.

## Environment variables

In Supabase, open **Project Settings > Database > Connection string** and choose
the **Connection Pooler** connection string.

Set either `DATABASE_URL`:

```text
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?sslmode=require
DB_SSLMODE=require
NODE_ENV=production
```

Or set the split variables:

```text
DB_HOST=aws-0-<region>.pooler.supabase.com
DB_PORT=6543
DB_USER=postgres.<project-ref>
DB_PASSWORD=<your-supabase-db-password>
DB_NAME=postgres
DB_SSLMODE=require
NODE_ENV=production
```

Do not use `db.<project-ref>.supabase.co` on Render if it fails with
`ENETUNREACH`; that is the direct Supabase host and may require IPv6 support.

If Render later shows a certificate error instead of `ENETUNREACH`, set:

```text
DB_SSLMODE=no-verify
```

Keep this only as a fallback; `require` is preferred when it works.
