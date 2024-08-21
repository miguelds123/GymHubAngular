import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasClienteIndexComponent } from './facturas-cliente-index.component';

describe('FacturasClienteIndexComponent', () => {
  let component: FacturasClienteIndexComponent;
  let fixture: ComponentFixture<FacturasClienteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturasClienteIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacturasClienteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
