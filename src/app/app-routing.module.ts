import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PantsComponent } from "./clothes-com/pants/pants.component";
import { CoatComponent } from "./clothes-com/coat/coat.component";
import { TShirtComponent } from "./clothes-com/t-shirt/t-shirt.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { MyComponent } from "./my/my.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "pants", component: PantsComponent },
  { path: "coat", component: CoatComponent },
  { path: "shirt", component: TShirtComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "mysize", component: MyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
