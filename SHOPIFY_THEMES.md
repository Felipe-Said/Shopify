# Shopify Theme Compatibility

Cartify can now inspect a Shopify theme folder and build a manifest from the standard Shopify theme structure:

- `assets`
- `blocks`
- `config`
- `layout`
- `locales`
- `sections`
- `snippets`
- `templates`

Use:

```bash
npm run compile
npm run theme:shopify:inspect -- ./themes/my-shopify-theme
```

The inspector validates `layout/theme.liquid`, reads theme files, lists templates, sections, snippets and locales, and parses `config/settings_schema.json` and `config/settings_data.json` when present.

## Current Status

Cartify's native theme engine uses React components compiled into `themes/<theme>/dist`. Shopify themes use Liquid templates and Shopify-specific objects. Because of that, a Shopify theme can be read and validated today, but it cannot be safely activated as the live storefront theme until the Liquid adapter is implemented.

If a Shopify Liquid theme is set as `system.theme`, Cartify stops during startup with an explicit message instead of failing later in Webpack.

## Adapter Work Still Required

Full Shopify theme rendering needs:

- Liquid rendering support.
- A Cartify-to-Shopify object mapper for `product`, `collection`, `cart`, `customer`, `shop`, `settings`, routes and filters.
- Static serving for Shopify theme assets.
- Section/template rendering rules.
- Theme settings persistence and an editor/import flow.

Shopify documents this theme architecture as a folder-based Liquid theme system with directories such as `layout`, `templates`, `sections`, `snippets`, `assets`, `config` and `locales`.
