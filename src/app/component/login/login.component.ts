import { Component, OnInit, ViewChild } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') public loginForm: NgForm;

  constructor(private auth: AuthService, private route: Router) {

  }

  ngOnInit() {
    if (this.auth.isLoggedIn.value) {
      this.route.navigate(['/home']);
    }

    this.loginForm.reset();
  }

  onSubmit(form: NgForm): void {
    this.auth.login(form.value)
      .subscribe(() => {
        this.route.navigateByUrl('/home');
      },
      e => { alert(e) });
  }
}
