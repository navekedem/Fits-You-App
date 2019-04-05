import { Injectable } from "@angular/core";
import { UserModel } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  createUser(email: string, userName: string, password: string) {
    const newUser: UserModel = {
      email: email,
      userName: userName,
      password: password
    };

    this.http
      .post("http://localhost:3000/api/signup", newUser)
      .subscribe(() => {
        this.router.navigate(["/login"]);
      });
  }

  login(email: string, password: string) {

  }
}
