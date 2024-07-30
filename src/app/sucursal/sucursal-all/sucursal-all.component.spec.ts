import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalAllComponent } from './sucursal-all.component';

describe('SucursalAllComponent', () => {
  let component: SucursalAllComponent;
  let fixture: ComponentFixture<SucursalAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucursalAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucursalAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
