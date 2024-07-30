import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalIndexComponent } from './sucursal-index.component';

describe('SucursalIndexComponent', () => {
  let component: SucursalIndexComponent;
  let fixture: ComponentFixture<SucursalIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucursalIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucursalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
