import type { CartifyRequest } from '../../types/request.js';

export function isAjax(request: CartifyRequest) {
  return request.get('X-Requested-With') === 'XMLHttpRequest';
}
