import { CartifyRequest } from '../../../../types/request.js';
import { CartifyResponse } from '../../../../types/response.js';
import updateCollection from '../../services/collection/updateCollection.js';

export default async (request: CartifyRequest, response: CartifyResponse) => {
  const collection = await updateCollection(
    Array.isArray(request.params.id) ? request.params.id[0] : request.params.id,
    request.body,
    {
      routeId: request.currentRoute.id
    }
  );
  return collection;
};
