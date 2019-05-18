import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOnline = false;
  private onlineSub: Subscription;
  constructor(private authService: AuthService) {
    this.onlineSub = this.authService.onlineLiscener().subscribe(isLogin => {
      this.isOnline = isLogin;
      console.log(this.isOnline);
    });

  }

  ngOnInit() {

  }
  ngOnDestroy(): void {
    this.onlineSub.unsubscribe();
  }
  logOut() {
    this.authService.logOut();
  }


}
