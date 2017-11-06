import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import 'rxjs/add/operator/timeout';
// import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {

  }

  login(jsonObject: Object): Observable<object> {

    const source = Observable.create(observer => {

      const req = this.http.post('https://pwcfrontendtest.azurewebsites.net/login', jsonObject);
      //req.(2000, 'Connection time out, please try again later.');
      req.subscribe(rsp => {
        if (rsp != null && rsp !== undefined && rsp.hasOwnProperty('token')) {
          this.setAuthToken(rsp['token']);
          this.isLoggedIn.next(true);
          observer.next();
        } else {
          this.isLoggedIn.next(false);
          observer.error(rsp['status']);
        }
        observer.complete();
      }, (e:Error) => {
        console.log(e.name);
      });
      // Any cleanup logic might go here
      return () => console.log('login clean');
    });

    return source;
  }

  validateLoginStatus(): boolean {
    let result: boolean = !!this.getAuthToken();

    if (result) {
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }

    return result;
  }

  logout(): void {
    this.clearAuthToken();
    this.isLoggedIn.next(false);
  }

  setAuthToken(token: string): void {
    localStorage.setItem('TiMallToken', token);
  }

  getAuthToken(): string {
    return localStorage.getItem('TiMallToken');
  }

  clearAuthToken(): void {
    localStorage.removeItem('TiMallToken');
  }
}
