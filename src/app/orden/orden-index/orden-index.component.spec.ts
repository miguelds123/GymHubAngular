import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenIndexComponent } from './orden-index.component';

describe('OrdenIndexComponent', () => {
  let component: OrdenIndexComponent;
  let fixture: ComponentFixture<OrdenIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdenIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdenIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
