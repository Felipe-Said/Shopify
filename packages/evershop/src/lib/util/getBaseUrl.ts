import { normalizePort } from '../../bin/lib/normalizePort.js';
import { getConfig } from './getConfig.js';

export function getBaseUrl(): string {
  const port = normalizePort();
  const baseUrl =
    process.env.SHOP_HOME_URL ||
    process.env.SITE_URL ||
    process.env.PUBLIC_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    getConfig('shop.homeUrl', '');

  if (baseUrl) {
    return baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Missing production base URL. Set SHOP_HOME_URL to your public store URL.'
    );
  }

  return `http://localhost:${port}`;
}
