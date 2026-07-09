import { request } from 'express';
import { CartifyRequest } from '../../types/request.js';
import { loginUserWithEmail } from './services/loginUserWithEmail.js';
import { logoutUser } from './services/logoutUser.js';

export default () => {
  (request as unknown as CartifyRequest).loginUserWithEmail =
    async function login(email, password, callback) {
      await loginUserWithEmail.bind(this)(email, password);
      if (this.session) {
        this.session.save(callback);
      }
    };

  (request as unknown as CartifyRequest).logoutUser = function logout(
    callback
  ) {
    logoutUser.bind(this)();
    if (this.session) {
      this.session.save(callback);
    }
  };

  (request as unknown as CartifyRequest).isUserLoggedIn =
    function isUserLoggedIn() {
      return !!this.session.userID;
    };

  (request as unknown as CartifyRequest).getCurrentUser =
    function getCurrentUser() {
      return this.locals.user;
    };
};
