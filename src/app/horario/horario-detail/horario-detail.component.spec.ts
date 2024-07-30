import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioDetailComponent } from './horario-detail.component';

describe('HorarioDetailComponent', () => {
  let component: HorarioDetailComponent;
  let fixture: ComponentFixture<HorarioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorarioDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
