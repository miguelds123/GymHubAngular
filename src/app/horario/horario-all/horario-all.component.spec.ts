import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAllComponent } from './horario-all.component';

describe('HorarioAllComponent', () => {
  let component: HorarioAllComponent;
  let fixture: ComponentFixture<HorarioAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorarioAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorarioAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
