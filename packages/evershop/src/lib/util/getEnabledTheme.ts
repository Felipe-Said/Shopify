import { existsSync } from 'fs';
import { resolve } from 'path';
import { CONSTANTS } from '../helpers.js';
import { error } from '../log/logger.js';
import { getConfig } from './getConfig.js';
import isDevelopmentMode from './isDevelopmentMode.js';
import isProductionMode from './isProductionMode.js';

export type Theme = {
  name: string;
  path: string;
  srcPath?: string;
};

export function getEnabledTheme(): Theme | null {
  const themeConfig = getConfig('system.theme') as string | undefined;
  if (!themeConfig) {
    return null;
  }
  const themePath = resolve(CONSTANTS.THEMEPATH, themeConfig);
  const isShopifyLiquidTheme = existsSync(
    resolve(themePath, 'layout', 'theme.liquid')
  );
  if (!existsSync(themePath)) {
    error(
      `Theme '${themeConfig}' does not exist in ${CONSTANTS.THEMEPATH}. 
      Please check your theme configuration in the system settings.`
    );
    process.exit(1);
  } else if (isShopifyLiquidTheme) {
    error(
      `Theme '${themeConfig}' is a Shopify Liquid theme. Cartify can inspect this theme with "npm run theme:shopify:inspect -- ./themes/${themeConfig}", but rendering it requires the Shopify Liquid adapter.`
    );
    process.exit(1);
  } else if (
    isDevelopmentMode() &&
    !existsSync(resolve(themePath, 'src'))
  ) {
    error(
      `Theme '${themeConfig}' must have a 'src' directory at ${resolve(
        themePath,
        'src'
      )}. This is required for development mode.`
    );
    process.exit(1);
  } else if (
    isProductionMode() &&
    !existsSync(resolve(themePath, 'dist'))
  ) {
    error(
      `Theme '${themeConfig}' must have a 'dist' directory at ${resolve(
        themePath,
        'dist'
      )}. This is required for production mode. Please run the compile command to generate the dist directory.`
    );
    process.exit(1);
  } else {
    return {
      name: themeConfig,
      path: themePath,
      srcPath: isDevelopmentMode() ? resolve(themePath, 'src') : undefined
    };
  }
}
