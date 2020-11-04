import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subId: string;
  private xApiKey: string;

  constructor() { }

  getSubId(): string {
    return this.subId;
  }

  setSubId(subId: string) {
    this.subId = subId;
  }

  getXApiKey(): string {
    return this.xApiKey;
  }

  setXApiKey(xApiKey: string) {
    this.xApiKey = xApiKey;
  }

  isLoggedIn(): boolean {
    const xApiKey = this.getXApiKey();
    return typeof(xApiKey) === 'string' && xApiKey.length > 0;
  }

}
