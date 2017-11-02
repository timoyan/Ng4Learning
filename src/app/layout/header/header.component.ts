import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  show = true;
  currentUrl: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Header url subscribe : ' + event.url);
        this.currentUrl = event.url;
      }
    });

    this.authService.isLoggedIn.subscribe(val => {
      this.show = val;
    });
  }

  onLogOut(e: MouseEvent) {
    this.authService.logout();
    this.router.navigate(['/login']);
    e.stopPropagation();
    return false;
  }

  navgate_onChange(e) {
    const navigateLink = e.target.value;
    console.log(navigateLink);
    this.router.navigate([navigateLink]);
  }
}
