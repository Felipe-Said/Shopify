import { CartifyRequest } from '../../../../types/request.js';
import { CartifyResponse } from '../../../../types/response.js';
import escapePayload from '../../services/escapePayload.js';

export default (request: CartifyRequest, response: CartifyResponse, next) => {
  if (request.method === 'GET') {
    next();
  } else {
    escapePayload(request.body);
    next();
  }
};
