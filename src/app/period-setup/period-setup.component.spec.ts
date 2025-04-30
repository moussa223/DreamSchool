import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodSetupComponent } from './period-setup.component';

describe('PeriodSetupComponent', () => {
  let component: PeriodSetupComponent;
  let fixture: ComponentFixture<PeriodSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
