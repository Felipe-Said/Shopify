import { INTERNAL_SERVER_ERROR, OK } from '../../../../lib/util/httpStatus.js';
import { CartifyRequest } from '../../../../types/request.js';
import { CartifyResponse } from '../../../../types/response.js';
import { deletePage } from '../../services/page/deletePage.js';

export default async (
  request: CartifyRequest,
  response: CartifyResponse,
  next
) => {
  try {
    const { id } = request.params;
    const page = await deletePage(id, {
      routeId: request.currentRoute.id
    });
    response.status(OK);
    response.json({
      data: page
    });
  } catch (e) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
