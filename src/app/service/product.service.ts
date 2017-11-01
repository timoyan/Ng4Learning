import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../def/product';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  GetProducts(): Observable<Product[]> {

    return this.http.get('https://pwcfrontendtest.azurewebsites.net/getlist', {
      headers: new HttpHeaders().set('RequestVerificationToken', this.authService.getAuthToken()),
    })
      .map((response: Response) => {
        return response['res'].map((prd) => prd as Product);
      });

  }
}
