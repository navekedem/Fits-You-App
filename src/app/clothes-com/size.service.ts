import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SizeModel } from '../models/size';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SizeService {

  private userSize = new Subject<SizeModel>();
  sizeFromdb: SizeModel;
  constructor(private router: Router ,private http: HttpClient){
  }



  addSize(Size: SizeModel){

    this.http.post("http://localhost:3000/api/addsize", Size).subscribe(dataFromDb => {

    });
  }


  getUserSize() {
    const id = localStorage.getItem("userId");

    this.http.get<{size:any; message:string}>("http://localhost:3000/api/mysize/"+ id).subscribe(dataFromDb => {
      if(dataFromDb.size) {
         this.sizeFromdb = {
          _id: dataFromDb.size._id,
          userId: id,
          height: dataFromDb.size.height,
          weight: dataFromDb.size.weight,
          legsLength: dataFromDb.size.legsLength,
          hipLine:dataFromDb.size.hipLine,
          shirtLength: dataFromDb.size.shirtLength,
          bust: dataFromDb.size.bust,
          shoulder: dataFromDb.size.shoulder,
          sleeves: dataFromDb.size.sleeves,
        }
      }
      console.log(this.sizeFromdb);
      this.userSize.next(this.sizeFromdb);
    });
  }

  editSize(Size: SizeModel) {
    this.http
    .put("http://localhost:3000/api/editsize/" +  this.sizeFromdb._id, Size)
    .subscribe(result => {
      this.router.navigate(["/"]);
    });
  }

  getSizeLiscener() {
    return this.userSize.asObservable();
  }

  fitTShirt(pants){

  }

}
