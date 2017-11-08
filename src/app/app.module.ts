import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { ProductsComponent } from './component/products/products.component';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { ProductsItemComponent } from './component/products-item/products-item.component';
import { CartService } from './service/cart.service';
import { CartModalComponent} from './component/cart-modal/cart-modal.component';
import { CartModalRowComponent } from './component/cart-modal-row/cart-modal-row.component';
import { TokenInterceptor } from './interceptor/tokenInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductsComponent,
    HomeComponent,
    NotFoundComponent,
    ProductsItemComponent,
    CartModalComponent,
    CartModalRowComponent
  ],
  entryComponents:[
    CartModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, CartService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
