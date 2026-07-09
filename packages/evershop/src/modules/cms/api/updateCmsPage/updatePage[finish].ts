import { CartifyRequest } from '../../../../types/request.js';
import updatePage from '../../services/page/updatePage.js';

export default async (request: CartifyRequest, response) => {
  const data = request.body;
  const page = await updatePage(request.params.id, data, {
    routeId: request.currentRoute.id
  });

  return page;
};
