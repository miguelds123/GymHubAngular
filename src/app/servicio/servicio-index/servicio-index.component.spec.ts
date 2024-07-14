import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioIndexComponent } from './servicio-index.component';

describe('ServicioIndexComponent', () => {
  let component: ServicioIndexComponent;
  let fixture: ComponentFixture<ServicioIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicioIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
