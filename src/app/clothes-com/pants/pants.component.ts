import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-pants",
  templateUrl: "./pants.component.html",
  styleUrls: ["./pants.component.css"]
})
export class PantsComponent implements OnInit {

  constructor() {}
  pantsForm = new FormGroup({
    pantsLength: new FormControl(),
    hipLine: new FormControl()
  });

  ngOnInit() {
    this.pantsForm.setValue({ pantsLength: "0", hipLine: "0" });
  }

  onFormSubmit() {
    const pantsSize = {
      pantsLength: this.pantsForm.get("pantsLength").value,
      hipLine: this.pantsForm.get("hipLine").value
    };
  }
}
