import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  public loginStatus = 0; // 0 = not logged in, 1 = logged in
  /**
   *
   */
  constructor(private http: HttpClient) {

  }

  login(jsonObject: Object): void {
    const req = this.http.post('https://pwcfrontendtest.azurewebsites.net/login', jsonObject);

    req.subscribe(rsp => {

      if (rsp != null && rsp != undefined && rsp.hasOwnProperty('token')) {
        this.setAuthToken(rsp['token']);
        this.loginStatus = 1;
      }
      else {   
        this.loginStatus = 0;  
      }

      // Read the result field from the JSON response.
      console.log(rsp);
    });
  }

  logout(): void{
    this.clearAuthToken();
    this.loginStatus = 0;
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
