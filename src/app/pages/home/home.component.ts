import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { BlogListComponent } from "../../shared/components/blogs/blog-list/blog-list.component";
import { UserFormComponent } from "../../shared/components/forms/user-form/user-form.component";
import { GlobalService } from 'src/app/shared/services/core/global.service';
import { UsersService } from 'src/app/shared/services/app/users.service';
import { BlogService } from 'src/app/shared/services/app/blog.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { IBlogs } from 'src/app/shared/interfaces/IBlogs';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [BlogListComponent, UserFormComponent]
})
export class HomeComponent implements OnInit {
    allblogs: IBlogs[] = [];

    blogService = inject(BlogService)

    ngOnInit() {
        this.blogs()
      }
    
      blogs() {
        this.blogService.blogs().subscribe((blogs: IBlogs[]) => {
          this.allblogs = blogs
        });
      }
}
