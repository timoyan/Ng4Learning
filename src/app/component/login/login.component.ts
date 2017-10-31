import { Component, OnInit, ViewChild } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') public loginForm: NgForm;

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.loginForm.reset();
  }

  onSubmit(form: NgForm): void {
    this.auth.login(form.value);
    this.loginForm.reset();
  }
}
