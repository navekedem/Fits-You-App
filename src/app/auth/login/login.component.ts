import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    if(!loginForm.valid){
      return;
    }
    this.authService.login(loginForm.value.email, loginForm.value.password);
    loginForm.resetForm();
  }
}
