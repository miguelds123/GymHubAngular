import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDiagComponent } from './producto-diag.component';

describe('ProductoDiagComponent', () => {
  let component: ProductoDiagComponent;
  let fixture: ComponentFixture<ProductoDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoDiagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
