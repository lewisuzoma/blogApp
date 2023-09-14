import { Component, OnInit, TemplateRef  } from '@angular/core';
import { GlobalService } from './shared/services/core/global.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { UsersService } from './shared/services/app/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'userMgtApp';
  data: any;
  modalRef: BsModalRef | undefined; 
  
  constructor(
    public global: GlobalService,
    public modalService: BsModalService,
    private usersService: UsersService,
    ) {}

  ngOnInit() {}

  openModalWithClass(template: TemplateRef<any>, event: any) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  

    );
    this.title = event
  }

  async submit (){
    try{
      const res = await this.usersService.addNewUser(JSON.stringify(this.data))
      if(res == 'register') {
        this.modalService.hide()
        this.global.alertType.next('success');
        this.global.alertMessage.next('New User added successfully');
      }
    }catch(error: any){
      this.global.alertType.next('danger');
      this.global.alertMessage.next(error?.error || error?.detail || error);
    } finally {
      setTimeout(() => this.global.alertType.next(false) , 5000);
    }
   
  }


}
