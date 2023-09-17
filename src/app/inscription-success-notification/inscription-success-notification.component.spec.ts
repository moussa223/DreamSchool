import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionSuccessNotificationComponent } from './inscription-success-notification.component';

describe('InscriptionSuccessNotificationComponent', () => {
  let component: InscriptionSuccessNotificationComponent;
  let fixture: ComponentFixture<InscriptionSuccessNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionSuccessNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionSuccessNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
