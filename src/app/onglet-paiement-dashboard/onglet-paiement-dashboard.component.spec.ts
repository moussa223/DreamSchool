import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletPaiementDashboardComponent } from './onglet-paiement-dashboard.component';

describe('OngletPaiementDashboardComponent', () => {
  let component: OngletPaiementDashboardComponent;
  let fixture: ComponentFixture<OngletPaiementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletPaiementDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletPaiementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
