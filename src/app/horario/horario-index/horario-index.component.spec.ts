import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioIndexComponent } from './horario-index.component';

describe('HorarioIndexComponent', () => {
  let component: HorarioIndexComponent;
  let fixture: ComponentFixture<HorarioIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorarioIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorarioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
