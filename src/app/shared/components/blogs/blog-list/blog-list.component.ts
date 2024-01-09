import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  @Input() admin: boolean = false;
  @Input() data: any = []
  @Output() addEvent: EventEmitter<any> = new EventEmitter;
  @Output() editEvent: EventEmitter<any> = new EventEmitter;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter;

  // track(index: number, item: any): number {
  //   return item.notificationId;
  // }

}
