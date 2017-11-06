import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './service/auth.service';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   *
   */
  constructor(private router: Router, private authService: AuthService, private cartService: CartService) {

    this.authService.validateLoginStatus();

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log(event);
      }
    });
  }
}
