import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletPaiementAjoutComponent } from './onglet-paiement-ajout.component';

describe('OngletPaiementAjoutComponent', () => {
  let component: OngletPaiementAjoutComponent;
  let fixture: ComponentFixture<OngletPaiementAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletPaiementAjoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletPaiementAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
