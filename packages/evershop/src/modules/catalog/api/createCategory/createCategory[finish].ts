import { CartifyRequest } from '../../../../types/request.js';
import { CartifyResponse } from '../../../../types/response.js';
import createCategory from '../../services/category/createCategory.js';

export default async (request: CartifyRequest, response: CartifyResponse) => {
  const result = await createCategory(request.body, {
    routeId: request.currentRoute.id
  });
  return result;
};
