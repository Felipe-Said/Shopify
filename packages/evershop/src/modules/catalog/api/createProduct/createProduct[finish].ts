import { CartifyRequest } from '../../../../types/request.js';
import { CartifyResponse } from '../../../../types/response.js';
import createProduct from '../../services/product/createProduct.js';

export default async (request: CartifyRequest, response: CartifyResponse) => {
  const result = await createProduct(request.body, {
    routeId: request.currentRoute.id
  });
  return result;
};
