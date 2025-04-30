import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletPaiementHistoriqueComponent } from './onglet-paiement-historique.component';

describe('OngletPaiementHistoriqueComponent', () => {
  let component: OngletPaiementHistoriqueComponent;
  let fixture: ComponentFixture<OngletPaiementHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletPaiementHistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletPaiementHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
