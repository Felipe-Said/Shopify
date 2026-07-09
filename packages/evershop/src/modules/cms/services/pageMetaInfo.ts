import { PageMetaInfo } from '../../../types/pageMeta.js';
import { CartifyRequest } from '../../../types/request.js';
import {
  getContextValue,
  setContextValue
} from '../../graphql/services/contextHelper.js';

export function setPageMetaInfo(
  request: CartifyRequest,
  info: Partial<PageMetaInfo>
) {
  const current = getContextValue(request, 'pageInfo', {});
  const newInfo = { ...current, ...info };
  setContextValue(request, 'pageInfo', newInfo);
}

export function getPageMetaInfo(request: CartifyRequest): PageMetaInfo {
  return getContextValue(request, 'pageInfo', {}) as PageMetaInfo;
}
