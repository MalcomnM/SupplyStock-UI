import jwtDecode from 'jwt-decode';

interface ICookieHandler {
  set: (value: string, days: number) => void;
  get: (name: string) => string | null;
  remove: (name: string) => void;
  isExpired: (name: string) => boolean;
}

export default class CookieHandler implements ICookieHandler {
  value: string | undefined;
  name: string;
  path: string | undefined;
  expires: string;

  constructor(name: string, expires?: string | undefined) {
    const date = new Date();
    const defaultExpiration = 0.5 * 24 * 60 * 60 * 1000;
    date.setTime(date.getTime() + defaultExpiration);

    this.name = name;
    this.expires = expires || date.toUTCString();
  }

  set(value: string, days?: number | null): void {
    this.value = value;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      this.expires = date.toUTCString();
    }
    document.cookie = `${this.name}=${value || ''}; expires=${
      this.expires
    }; path=/;`;
  }

  //@ts-ignore
  get(): string | undefined {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(this.name))
      ?.split('=')[1];
    return cookie;
  }

  remove(): void {
    document.cookie = `${this.name}=; expires=0; path=/;`;
  }

  isExpired(): boolean {
    const cookieValue = this.get();
    if (!cookieValue || cookieValue === 'undefined') {
      return true;
    }

    const decoded: any = jwtDecode(cookieValue);
    const currentTime = Date.now() / 1000;

    return decoded?.exp < currentTime;
  }
}
