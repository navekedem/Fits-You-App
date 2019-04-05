import { Component, OnInit } from '@angular/core';
import { ClothesService } from '../clothes.service';

@Component({
  selector: 'app-coat',
  templateUrl: './coat.component.html',
  styleUrls: ['./coat.component.css']
})
export class CoatComponent implements OnInit {

  constructor(private clothesService: ClothesService) { }

  ngOnInit() {
  }

}
