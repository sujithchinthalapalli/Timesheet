import { Injectable } from '@angular/core';
declare let OktaSignIn: any;
import { environment } from '../../environments/environment';

@Injectable()
export class Okta {
  widget;

  constructor() {
    this.widget = new OktaSignIn({
      baseUrl: environment.okta_url,
      clientId: environment.okta_clientId,
      redirectUri: environment.okta_redirectUri
    });
  }

  getWidget() {
    return this.widget;
  }
}