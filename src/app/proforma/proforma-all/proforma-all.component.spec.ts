import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaAllComponent } from './proforma-all.component';

describe('ProformaAllComponent', () => {
  let component: ProformaAllComponent;
  let fixture: ComponentFixture<ProformaAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProformaAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProformaAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
