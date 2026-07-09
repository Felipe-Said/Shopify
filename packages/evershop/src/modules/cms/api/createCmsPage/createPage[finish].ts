import { CartifyRequest } from '../../../../types/request.js';
import { CartifyResponse } from '../../../../types/response.js';
import { createPage } from '../../services/page/createPage.js';

export default async (request: CartifyRequest, response: CartifyResponse) => {
  const data = request.body;
  const result = await createPage(data, {
    routeId: request.currentRoute.id
  });

  return result;
};
