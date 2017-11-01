import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

  }

  login(jsonObject: Object): Observable<object> {

    const source = Observable.create(observer => {

      const req = this.http.post('https://pwcfrontendtest.azurewebsites.net/login', jsonObject);

      req.subscribe(rsp => {
        if (rsp != null && rsp !== undefined && rsp.hasOwnProperty('token')) {
          this.setAuthToken(rsp['token']);
          this.isLoggedIn.next(true);
          observer.next();
        } else {
          this.isLoggedIn.next(false);
          observer.error();
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
    this.isLoggedIn.next(false);
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
