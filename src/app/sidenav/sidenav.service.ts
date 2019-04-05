import { Router } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {

  constructor(private router: Router) {
  }

  moveTo(name: string) {
    this.router.navigate(['/'+name]);
  }

}
