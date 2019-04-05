import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  addUser(userForm: NgForm) {

    if(!userForm.valid){
      return;
    }
    this.authService.createUser(userForm.value.email, userForm.value.userName , userForm.value.password);
    userForm.resetForm();
  }

}
