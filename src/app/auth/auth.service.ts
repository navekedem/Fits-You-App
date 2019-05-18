import { Injectable } from "@angular/core";
import { UserModel } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  isOnline = false;
  token: string;
  expirationDate: Date;
  private tokenTimer: any;
  private userOnline = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, userName: string, password: string) {
    const newUser: UserModel = {
      _id: null,
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
    const data = {
      email: email,
      password: password
    };

    this.http
      .post<{ user: any; message: string; size: any; userToken: string; expiresIn:number}>(
        "http://localhost:3000/api/login",
        data
      )
      .subscribe(dataFromDb => {
        if (!dataFromDb.user) {
          return alert(dataFromDb.message);
        }

        this.isOnline = true;
        this.userOnline.next(this.isOnline);
        const fetchUser: UserModel = {
          _id: dataFromDb.user._id,
          password: null,
          userName: dataFromDb.user.userName,
          email: dataFromDb.user.email
        };
        this.token = dataFromDb.userToken;
        const tokenExpiresTime = dataFromDb.expiresIn;
        this.setTimer(tokenExpiresTime);
        const now = new Date();
        this.expirationDate = new Date(now.getTime() + tokenExpiresTime * 1000);
        if (!dataFromDb.size) {
          console.log(dataFromDb.size);
          this.router.navigate(["/mysize"]);
        } else {
          this.router.navigate(["/"]);
        }
        this.addToLocalStorage(fetchUser._id);
      });
  }

  onlineLiscener() {
    return this.userOnline.asObservable();
  }

  addToLocalStorage(userId: string) {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", this.token);
    localStorage.setItem("expiresIn", this.expirationDate.toISOString());
  }
  removeLocalStorage() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
  }
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresTime = authInformation.expiresIn.getTime() - now.getTime();

    if(expiresTime > 0){
      this.token = authInformation.token;

      this.setTimer(expiresTime / 1000);
      this.isOnline = true;
      this.userOnline.next(true);
    }
  }

  logOut() {
    this.isOnline = false;
    this.userOnline.next(this.isOnline);
    clearTimeout(this.tokenTimer);
    this.router.navigate(["/"]);
    this.removeLocalStorage();
  }

  setTimer(time: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, time * 1000);

  }

  private getAuthData() {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const expiretionDate = localStorage.getItem("expiresIn" );
    if(!token || !expiretionDate) {

      return;
    }

    return {
      id: id,
      token: token,
      expiresIn: new Date(expiretionDate)
    }
  }


}
