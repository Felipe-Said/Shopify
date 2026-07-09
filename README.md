# Cartify

Cartify is a commerce platform built on a TypeScript, React, GraphQL and PostgreSQL stack. It includes a storefront, checkout, customer accounts, a merchant dashboard, catalog management, orders, CMS pages, payments and shipping settings.

## Deploy

This project is currently prepared for Render + Supabase.

Useful docs in this repository:

- [Render + Supabase deploy guide](./RENDER.md)
- [Shopify theme compatibility notes](./SHOPIFY_THEMES.md)

## Main URLs

- Platform landing: `/`
- Merchant signup: `/merchant/register`
- Merchant/admin panel: `/admin`
- Merchant/admin login: `/admin/login`
- Customer login: `/account/login`
- Customer signup: `/account/register`

## Scripts

```bash
npm install
npm run compile:db
npm run compile
npm run build
npm run start
```

## Notes

Cartify currently supports a single-store admin model. Public merchant signup creates an administrator for the current store. Full multi-store SaaS behavior requires tenant isolation, store provisioning and per-store routing.
