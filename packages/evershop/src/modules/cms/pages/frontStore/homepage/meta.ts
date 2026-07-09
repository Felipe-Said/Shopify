import { getSetting } from '../../../../setting/services/setting.js';
import { setPageMetaInfo } from '../../../services/pageMetaInfo.js';

export default async (request, response, next) => {
  setPageMetaInfo(request, {
    title: await getSetting('storeName', 'Cartify'),
    description: await getSetting(
      'storeDescription',
      'Commerce platform for modern stores'
    )
  });
  next();
};
