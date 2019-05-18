import { Component, OnInit } from '@angular/core';
import { SizeService } from '../size.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coat',
  templateUrl: './coat.component.html',
  styleUrls: ['./coat.component.css']
})
export class CoatComponent implements OnInit {

  constructor(private clothesService: SizeService) { }
  coatForm = new FormGroup({
    bodyLength: new FormControl(),
    bust: new FormControl(),
    shoulder: new FormControl(),
    sleeves: new FormControl()
  });

  ngOnInit() {
    this.coatForm.setValue({bodyLength: '0', bust: '0',shoulder: "0"  , sleeves: "0"});
  }

  onFormSubmit() {
    const coatSize = {
      bodyLength: this.coatForm.get('bodyLength').value ,
      bust: this.coatForm.get('bust').value,
      shoulder: this.coatForm.get('shoulder').value,
      sleeves: this.coatForm.get('sleeves').value
    }
  }
}
////dsfdascscascascaxcasx
