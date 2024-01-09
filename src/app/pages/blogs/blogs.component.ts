import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { BlogListComponent } from "../../shared/components/blogs/blog-list/blog-list.component";
import { UserFormComponent } from "../../shared/components/forms/user-form/user-form.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GlobalService } from 'src/app/shared/services/core/global.service';
import { BlogService } from 'src/app/shared/services/app/blog.service';
import { AddBlogFormComponent } from "../../shared/components/forms/add-blog-form/add-blog-form.component";
import { IBlogs } from 'src/app/shared/interfaces/IBlogs';
import { EditBlogFormComponent } from "../../shared/components/forms/edit-blog-form/edit-blog-form.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-blogs',
    standalone: true,
    templateUrl: './blogs.component.html',
    styleUrl: './blogs.component.css',
    imports: [BlogListComponent, UserFormComponent, AddBlogFormComponent, EditBlogFormComponent, CommonModule]
})
export class BlogsComponent implements OnInit {
  title = 'userMgtApp';
  data: any;
  modalRef: BsModalRef | undefined; 
  allblogs: IBlogs[] = [];
  blogDetail: any;
  
  public global = inject(GlobalService)
  modalService = inject(BsModalService)
  blogService = inject(BlogService)

  openModalWithClass(template: TemplateRef<any>, event: any) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  

    );
    this.title = event
  }
  
  openModalWithClass2(template: TemplateRef<any>, event: any) {  
    this.blogService.blog(event.id).subscribe((blogData) => {
      this.blogDetail = {id: event.id, ...blogData};
    });

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  

    );
    
    this.title = event.name
  }

   ngOnInit() {
    this.blogs()
  }

  blogs() {
    this.blogService.blogs().subscribe((blogs: IBlogs[]) => {
      this.allblogs = blogs
    });
  }

  deleteFn(event: string) {
    this.global.loading.next(true);
    this.blogService.delete(event).then(() => {
      this.global.alertType.next('success');
      this.global.alertMessage.next('Blog deleted successfully');
      this.global.loading.next(false);
      this.blogs()
    })
    .catch((error) => {
      console.error('Error deleting blog:', error);
    });
  }

  async submit (){
    this.global.loading.next(true);
    try{
      const res = await this.blogService.create(this.data)
      if(res) {
        this.modalService.hide()
        this.global.alertType.next('success');
        this.global.alertMessage.next('New Post added successfully');
        this.blogs()
      }
    }catch(error: any){
      this.global.alertType.next('danger');
      this.global.alertMessage.next(error?.error || error?.detail || error);
    } finally {
      this.global.loading.next(false);
      setTimeout(() => this.global.alertType.next(false) , 5000);
    }
   
  }

  async update (){
    this.global.loading.next(true);
    try{
      await this.blogService.update(this.data.id, this.data)
      this.modalService.hide()
      this.global.alertType.next('success');
      this.global.alertMessage.next('Post updated successfully');
      this.blogs()
      
    }catch(error: any){
      this.global.alertType.next('danger');
      this.global.alertMessage.next(error?.error || error?.detail || error);
    } finally {
      setTimeout(() => this.global.alertType.next(false) , 5000);
      this.global.loading.next(false);
    }
   
  }
}
