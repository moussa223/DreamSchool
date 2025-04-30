import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletPaiementRetardComponent } from './onglet-paiement-retard.component';

describe('OngletPaiementRetardComponent', () => {
  let component: OngletPaiementRetardComponent;
  let fixture: ComponentFixture<OngletPaiementRetardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletPaiementRetardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletPaiementRetardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
