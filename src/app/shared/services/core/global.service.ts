import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  spinnerText: string = 'Processing...';
  users: any;
  user: any;
  alertType: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  alertMessage: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(
    public spinner: NgxSpinnerService
  ) { 
    // this.spinner.show(); 
  }
}
