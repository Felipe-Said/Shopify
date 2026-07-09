import { translate } from '../../../../../lib/locale/translate/translate.js';
import { buildUrl } from '../../../../../lib/router/buildUrl.js';
import { CartifyRequest } from '../../../../../types/request.js';
import { CartifyResponse } from '../../../../../types/response.js';
import { setPageMetaInfo } from '../../../../cms/services/pageMetaInfo.js';

export default (request: CartifyRequest, response: CartifyResponse, next) => {
  // Check if the customer is logged in
  if (request.isCustomerLoggedIn()) {
    // Redirect to homepage
    response.redirect(buildUrl('homepage'));
  } else {
    setPageMetaInfo(request, {
      title: translate('Reset password'),
      description: translate('Reset password')
    });
    next();
  }
};
