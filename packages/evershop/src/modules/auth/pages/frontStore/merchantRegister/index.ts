import { translate } from '../../../../../lib/locale/translate/translate.js';
import { buildUrl } from '../../../../../lib/router/buildUrl.js';
import { CartifyRequest } from '../../../../../types/request.js';
import { CartifyResponse } from '../../../../../types/response.js';
import { setPageMetaInfo } from '../../../../cms/services/pageMetaInfo.js';

export default (request: CartifyRequest, response: CartifyResponse, next) => {
  if (request.getCurrentUser()) {
    response.redirect(buildUrl('dashboard'));
  } else {
    setPageMetaInfo(request, {
      title: translate('Create your Cartify store'),
      description: translate('Create your Cartify merchant account')
    });
    next();
  }
};
