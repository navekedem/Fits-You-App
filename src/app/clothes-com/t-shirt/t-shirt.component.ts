import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-t-shirt",
  templateUrl: "./t-shirt.component.html",
  styleUrls: ["./t-shirt.component.css"]
})
export class TShirtComponent implements OnInit {

  constructor() {}

  shirtForm = new FormGroup({
    bodyLength: new FormControl(),
    bust: new FormControl(),
    shoulder: new FormControl(),
    sleeves: new FormControl()
  });

  ngOnInit() {
    this.shirtForm.setValue({bodyLength: '0', bust: '0',shoulder: "0"  , sleeves: "0"});
  }

  onFormSubmit() {
    const shirtSize = {
      bodyLength: this.shirtForm.get('bodyLength').value ,
      bust: this.shirtForm.get('bust').value,
      shoulder: this.shirtForm.get('shoulder').value,
      sleeves: this.shirtForm.get('sleeves').value
    }
  }
}
