import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { colDef } from '@bhplugin/ng-datatable';
import { UsersService } from 'src/app/shared/services/app/users.service';
import { GlobalService } from 'src/app/shared/services/core/global.service';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { UserEditFormComponent } from '../../forms/user-edit-form/user-edit-form.component';
import { takeUntil, catchError, finalize } from 'rxjs/operators';
import { Subject, Subscription, interval, mergeMap, throwError, of, retry  } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    DataTableModule,
    BsDropdownModule,
    UserFormComponent,
    UserEditFormComponent
  ],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy  {
  cols: Array<colDef> = [];
  rows: Array<any> = [];
  modalRef: BsModalRef | undefined;
  @Output() addEvent: EventEmitter<any> = new EventEmitter;
  data: any;
  private usersSubscription: Subscription | undefined;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private usersService: UsersService,
    public global: GlobalService,
    public modalService: BsModalService,
  ) {
   
  }

  ngOnInit(): void {
    this.fetchUsers();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  openModalWithClass(template: TemplateRef<any>, user: any, type?: string) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  

    ); 
        
    this.getUserInfo(user.id, type)
  }
  
  async getUserInfo(userId: any, type?:string) {
    try {
      this.global.user = await this.usersService.getUserInfo(userId);
      if(type=='Edit User') {
        this.global.user.header = 'Edit User';
      } else {
        this.global.user.header = 'User Details';
      }
    } catch (error: any) {
      this.global.alertType.next('danger');
      this.global.alertMessage.next(error?.error || error?.detail || error);
    } finally {
      setTimeout(() => this.global.alertType.next(false) , 5000);
    }
  }

  // async fetchUsers() {
  //   try {
  //     this.global.users = await this.usersService.getUsers();
  //     this.global.alertType.next('info');
  //     this.global.alertMessage.next('Users retrieved successfully');
  //     this.initData();
  //   } catch (error: any) {
  //     this.global.alertType.next('danger');
  //     this.global.alertMessage.next(error?.error || error?.detail || error);
  //   } 
  //   finally {
  //     setTimeout(() => this.global.alertType.next(false) , 5000);
  //   }
  // }

  fetchUsers() {
      this.usersSubscription = this.usersService.getUsers()
      .pipe(
        retry({ count: 2, delay: 1000 }),
        takeUntil(this.ngUnsubscribe),
        catchError(error => {
          console.error('Error fetching users:', error);
          this.global.alertType.next('danger');
          this.global.alertMessage.next(error?.error || error?.detail || error);
          return [];
        }),
        finalize(() => {
          setTimeout(() => this.global.alertType.next(false), 5000);
        })
      )
      .subscribe(
        {
          next: (users: any) => {
            this.global.users = users
            this.global.alertType.next('info');
            this.global.alertMessage.next('Users retrieved successfully');
            console.log(this.global.users)
            this.initData();
          },
          error: (error) => {
            this.global.alertType.next('danger');
            this.global.alertMessage.next(error);
            console.log('Error fetching users:', error)
          }
        }
      )
  }

  initData(){
    this.cols = [
        { field: "id", title: "ID", filter: false },
        { field: "name", title: "Name" },
        { field: "username", title: "Username" },
        { field: "email", title: "Email" },
        { field: "phone", title: "Phone" },
        { field: "actions", title: "Action" },
    ];

    this.rows = this.global.users;
  }

  async submit (){
    try{
      const res = await this.usersService.updateUserInfo(JSON.stringify(this.data))
      if(res) {
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
  
  async deleteUser(user: any) {
    if(confirm('Are you sure you want to delete this user')) {

      try {
        const res = await this.usersService.deleteUser(user.id);
        if(res) {
          this.global.alertType.next('danger');
          this.global.alertMessage.next('Users deleted successfully');
        }
      } catch (error: any) {
        this.global.alertType.next('danger');
        this.global.alertMessage.next(error?.error || error?.detail || error);
      } 
      finally {
        setTimeout(() => {
          this.global.alertType.next(false)
          this.fetchUsers()
        }, 5000);
      }

    }    
      // alert('Delete User \n' + user.id + ', ' + user.firstName + ', ' + user.lastName + ', ' + user.email);
  }

}
