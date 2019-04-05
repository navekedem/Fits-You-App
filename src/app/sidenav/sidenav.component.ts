import { Component, OnInit } from '@angular/core';
import { SideNavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private sideNavSerice: SideNavService) { }

  ngOnInit() {
  }

  moveTo(name: string){

    this.sideNavSerice.moveTo(name);
  }
}
