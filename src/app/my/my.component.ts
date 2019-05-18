import { Component, OnInit } from "@angular/core";
import { SizeService } from "../clothes-com/size.service";
import { NgForm } from "@angular/forms";
import { SizeModel } from "../models/size";
import { Subscription } from "rxjs";

@Component({
  selector: "app-my",
  templateUrl: "./my.component.html",
  styleUrls: ["./my.component.css"]
})
export class MyComponent implements OnInit {
  hip: Number;
  height: Number;
  weight: Number;
  legsLength: Number;
  bodyLength: Number;
  bust: Number;
  shoulder: Number;
  sleeves: Number;
  isEnabled = false;
  userHaveSize = false;
  private sizeSub: Subscription;

  constructor(private sizeService: SizeService) {
    this.sizeSub = this.sizeService.getSizeLiscener().subscribe(size => {
      if (size) {
        this.hip = size.hipLine;
        this.height = size.height;
        this.weight = size.weight;
        this.legsLength = size.legsLength;
        this.bodyLength = size.shirtLength;
        this.bust = size.bust;
        this.shoulder = size.shoulder;
        this.sleeves = size.sleeves;
        this.userHaveSize = true;
        this.isEnabled = true;

      }

    });
  }

  ngOnInit() {
    this.sizeService.getUserSize();
  }

  saveSize(form: NgForm) {
    const userId = localStorage.getItem("userId");
    const userSize: SizeModel = {
      _id: null,
      userId: userId,
      height: form.value.Height,
      weight: form.value.Weight,
      legsLength: form.value.Weight,
      hipLine: form.value.Hip,
      shirtLength: form.value.BodyLength,
      bust: form.value.BodyLength,
      shoulder: form.value.Shoulder,
      sleeves: form.value.Sleeves
    };
    if(this.userHaveSize) {
      this.sizeService.editSize(userSize);
    }
    else{
      this.sizeService.addSize(userSize);
    }
  }

  openEdit() {
    this.isEnabled = false;
  }




}
