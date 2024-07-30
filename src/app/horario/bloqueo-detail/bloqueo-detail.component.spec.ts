import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueoDetailComponent } from './bloqueo-detail.component';

describe('BloqueoDetailComponent', () => {
  let component: BloqueoDetailComponent;
  let fixture: ComponentFixture<BloqueoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BloqueoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BloqueoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
