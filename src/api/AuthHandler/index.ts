import qs from 'qs';
import axios from 'axios';
import CookieHandler from '../CookieHandler';
import jwtDecode from 'jwt-decode';
import { IDecodedAccessToken } from '../../hooks/api/auth/auth.interfaces';

// TODO: These should probably be env variables or secrets
const SCOPE =
  'openid profile organization role a1s-api a1s-api-identity a1s-api-catalog a1s-api-device a1s-api-device-config a1s-api-device-health a1s-api-facility a1s-api-facility-device a1s-api-facility-image a1s-api-facility-inventory a1s-api-reads a1s-api-tracking a1s-api-order a1s-api-facility-catalog';
const CLIENT_ID = 'a1s.device';
const CLIENT_SECRET = 'k15MomRZbxObaR2Q';

export interface IAuthHandler {
  cookieHandler: CookieHandler;
  setToken(token: string): void;
  isTokenExpired(): boolean;
  login(username: string, password: string): Promise<boolean>;
  initialAuth(): void;
  getUser(): IDecodedAccessToken | null;
  deleteCookie(): void;
}

export interface AuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export default class AuthHandler implements IAuthHandler {
  cookieHandler: CookieHandler;

  constructor() {
    this.cookieHandler = new CookieHandler('access_token');
    this.initialAuth();
  }

  initialAuth() {
    if (typeof window !== 'undefined') {
      if (!this.isTokenExpired()) {
        this.setToken(this.cookieHandler.get());
      }
    }
  }

  getToken(): string {
    const cookieValue = this.cookieHandler.get();
    if (!cookieValue || cookieValue === 'undefined') {
      return '';
    }
    return cookieValue;
  }

  deleteCookie() {
    this.cookieHandler.remove();
  }

  setToken(token: string | null) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  isTokenExpired() {
    var token = this.cookieHandler.get();
    if (!token || token === 'undefined') {
      return true;
    }
    return this.cookieHandler.isExpired();
  }

  getUser(): IDecodedAccessToken | null {
    var token = this.cookieHandler.get();
    if (!token || token === 'undefined') {
      return null;
    }
    return jwtDecode(token);
  }

  // login method
  async login(username: string | null, password: string | null) {
    const body = qs.stringify({
      grant_type: 'password',
      username: username,
      password: password,
      scope: SCOPE,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    try {
      let response = await axios.post<AuthToken>(
        'https://identity.all1.services/connect/token',
        body,
      );

      // Set the access_token
      const access_token = response?.data?.access_token;

      // Set access_token in cookies
      this.cookieHandler.set(access_token); // half a day auth

      // Set access_token in axios
      this.setToken(access_token);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
