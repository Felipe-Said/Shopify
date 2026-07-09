import {
  insert,
  insertOnUpdate,
  select
} from '@evershop/postgres-query-builder';
import { pool } from '../../../../lib/postgres/connection.js';
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  OK
} from '../../../../lib/util/httpStatus.js';
import { hashPassword } from '../../../../lib/util/passwordHelper.js';
import { refreshSetting } from '../../../setting/services/setting.js';

export default async (request, response) => {
  try {
    const { storeName, fullName, email, password } = request.body;
    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await select()
      .from('admin_user')
      .where('email', 'ILIKE', normalizedEmail)
      .load(pool);

    if (existingUser) {
      response.status(CONFLICT);
      response.json({
        error: {
          status: CONFLICT,
          message: 'A merchant account with this email already exists.'
        }
      });
      return;
    }

    const merchant = await insert('admin_user')
      .given({
        status: true,
        email: normalizedEmail,
        password: hashPassword(password),
        full_name: fullName
      })
      .execute(pool);

    await insertOnUpdate('setting', ['name'])
      .given({
        name: 'storeName',
        value: storeName,
        is_json: false
      })
      .execute(pool);
    await refreshSetting();

    response.status(OK);
    response.json({
      data: {
        uuid: merchant.uuid,
        email: merchant.email,
        fullName: merchant.full_name
      }
    });
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: error.message
      }
    });
  }
};
