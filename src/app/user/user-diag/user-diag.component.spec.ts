import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiagComponent } from './user-diag.component';

describe('UserDiagComponent', () => {
  let component: UserDiagComponent;
  let fixture: ComponentFixture<UserDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDiagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
