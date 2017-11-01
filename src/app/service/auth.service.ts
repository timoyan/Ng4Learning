import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AuthService {
  public loginStatus = 0; // 0 = not logged in, 1 = logged in
  /**
   *
   */
  constructor(private http: HttpClient) {

  }

  login(jsonObject: Object): Observable<object> {

    const source = Observable.create(observer => {

      const req = this.http.post('https://pwcfrontendtest.azurewebsites.net/login', jsonObject);

      req.subscribe(rsp => {
        if (rsp != null && rsp !== undefined && rsp.hasOwnProperty('token')) {
          this.setAuthToken(rsp['token']);
          this.loginStatus = 1;
          observer.next();
        } else {
          this.loginStatus = 0;
        }
        observer.complete();
      });
      // Any cleanup logic might go here
      return () => console.log('login clean');
    });

    return source;
  }

  logout(): void {
    this.clearAuthToken();
    this.loginStatus = 0;
  }

  validateLoginStatus(): boolean {
    return this.loginStatus === 1;
  }

  setLoginStatus(): void {
    if (!!this.getAuthToken()) {
      this.loginStatus = 1;
    } else {
      this.loginStatus = 0;
    }
  }

  setAuthToken(token: string): void {
    sessionStorage.setItem('TiMallToken', token);
  }

  getAuthToken(): string {
    return sessionStorage.getItem('TiMallToken');
  }

  clearAuthToken(): void {
    sessionStorage.removeItem('TiMallToken');
  }
}
