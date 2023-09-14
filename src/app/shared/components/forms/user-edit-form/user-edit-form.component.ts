import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {
  @Input() formData!: any;
  @Output() public userFormEvent = new EventEmitter<any>();

  addNewUserForm = new FormGroup({
    name: new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
    }),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    phone: new FormControl(null),
    address: new FormGroup({
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      zipcode: new FormControl(null),
    })
  });

  ngOnInit(): void {
    console.log(this.formData)
  }

  get f() { 
    return this.addNewUserForm.controls; 
  }

  submit(event: any) {
    if(this.addNewUserForm.invalid) {
      this.userFormEvent.emit()
      return;
    } 
    else {
      // console.log(this.addNewUserForm.value)
      this.userFormEvent.emit(this.addNewUserForm.value)
      return;
    }
    
  }

}
