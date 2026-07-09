import { getDelegate } from '../../../../lib/middleware/delegate.js';
import { buildUrl } from '../../../../lib/router/buildUrl.js';
import { OK } from '../../../../lib/util/httpStatus.js';
import { AttributeRow } from '../../../../types/db/index.js';
import { CartifyRequest } from '../../../../types/request.js';
import { CartifyResponse } from '../../../../types/response.js';

export default async (
  request: CartifyRequest,
  response: CartifyResponse,
  next
) => {
  const attribute = (await getDelegate(
    'updateAttribute',
    request
  )) as AttributeRow;
  response.status(OK);
  response.json({
    data: {
      ...attribute,
      links: [
        {
          rel: 'attributeGrid',
          href: buildUrl('attributeGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('attributeEdit', { id: attribute.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
