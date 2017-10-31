import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  onLogOut(e: MouseEvent) {
    this.authService.logout();
    this.router.navigate(['/login']);
    e.stopPropagation();
    return false;
  }
}
