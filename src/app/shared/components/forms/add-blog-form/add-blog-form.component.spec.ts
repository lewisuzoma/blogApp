import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogFormComponent } from './add-blog-form.component';

describe('AddBlogFormComponent', () => {
  let component: AddBlogFormComponent;
  let fixture: ComponentFixture<AddBlogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlogFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBlogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
