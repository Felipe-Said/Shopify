import bodyParser from 'body-parser';
import { CartifyRequest } from '../../types/request.js';
import { CartifyResponse } from '../../types/response.js';

export default (request: CartifyRequest, response: CartifyResponse, next) => {
  bodyParser.json()(request, response, next);
};
