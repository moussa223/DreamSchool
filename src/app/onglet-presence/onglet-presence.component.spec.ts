import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletPresenceComponent } from './onglet-presence.component';

describe('OngletPresenceComponent', () => {
  let component: OngletPresenceComponent;
  let fixture: ComponentFixture<OngletPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletPresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
