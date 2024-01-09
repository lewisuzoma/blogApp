import { Component, inject } from '@angular/core';
import { BlogListComponent } from "../../shared/components/blogs/blog-list/blog-list.component";
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BlogService } from 'src/app/shared/services/app/blog.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-blog-detail',
    standalone: true,
    templateUrl: './blog-detail.component.html',
    styleUrl: './blog-detail.component.css',
    imports: [BlogListComponent, RouterOutlet, RouterLink, RouterLinkActive]
})
export class BlogDetailComponent {
    blog: any;
    previousUrl: string | undefined;

    constructor(private router: Router) {
        this.previousUrl = this.router?.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
    }
    
    route = inject(ActivatedRoute)
    blogService = inject(BlogService)

    ngOnInit() {
        const heroId = this.route.snapshot.paramMap.get('id');
        this.blogService.blog(heroId).subscribe((blogData) => {
            this.blog = blogData;
          });
          
        // this.hero$ = this.service.getHero(heroId);
      }
}
