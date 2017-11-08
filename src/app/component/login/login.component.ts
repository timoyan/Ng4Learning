import { Component, OnInit, ViewChild } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { LoginDTO } from '../../def/loginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') public loginForm: NgForm;

  public loginModel: LoginDTO;

  constructor(private auth: AuthService, private route: Router) {
    this.loginModel = {
      username : '',
      password : ''
    } as LoginDTO;
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
        this.route.navigateByUrl('/products');
      },
      e => { alert(e) });
  }
}
