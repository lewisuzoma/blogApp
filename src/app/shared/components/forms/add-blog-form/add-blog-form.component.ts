import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'add-blog-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-blog-form.component.html',
  styleUrl: './add-blog-form.component.css'
})
export class AddBlogFormComponent {
  @Output() public blogFormEvent = new EventEmitter<any>();

  blogForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required])
  });
  
  get f() { 
    return this.blogForm.controls; 
  }

  submit(event: any) {
    if(this.blogForm.invalid) {
      this.blogFormEvent.emit()
      return;
    } 
    else {
      const files = event.target.files;
      if(files.length == 0) return;
      const mimeType = files[0].type;
      if(mimeType.match(/image\/*/) == null) return;
      const file = files[0];
      // console.log(this.form.value)
      // { id, ...data };
      let data = {
        description: this.blogForm.value.description,
        title: this.blogForm.value.title,
        image: file
      };
      this.blogFormEvent.emit(data)
      return;
    }
    
  }
}
