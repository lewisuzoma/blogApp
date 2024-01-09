import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'edit-blog-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-blog-form.component.html',
  styleUrl: './edit-blog-form.component.css'
})
export class EditBlogFormComponent implements OnInit, AfterViewChecked {
  @Input() blog: any;
  @Output() public blogFormEvent = new EventEmitter<any>();

  blogForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if(this.blog) {
      this.blogForm.patchValue({
        title: this.blog?.title,
        description: this.blog?.description,
        image: null
      });
    }
  }
  
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

      // console.log(this.form.value)
      // { id, ...data };
      let data = {
        description: this.blogForm.value.description,
        title: this.blogForm.value.title,
        image: files[0],
        id: this.blog?.id
      };
      this.blogFormEvent.emit(data)
      return;
    }
    
  }
}
