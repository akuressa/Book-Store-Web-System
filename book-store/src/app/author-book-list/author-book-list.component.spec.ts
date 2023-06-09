import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBookListComponent } from './author-book-list.component';

describe('AuthorBookListComponent', () => {
  let component: AuthorBookListComponent;
  let fixture: ComponentFixture<AuthorBookListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorBookListComponent]
    });
    fixture = TestBed.createComponent(AuthorBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
