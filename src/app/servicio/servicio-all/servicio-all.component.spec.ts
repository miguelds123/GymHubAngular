import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAllComponent } from './servicio-all.component';

describe('ServicioAllComponent', () => {
  let component: ServicioAllComponent;
  let fixture: ComponentFixture<ServicioAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicioAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
