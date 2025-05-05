import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletAnnonceListeComponent } from './onglet-annonce-liste.component';

describe('OngletAnnonceListeComponent', () => {
  let component: OngletAnnonceListeComponent;
  let fixture: ComponentFixture<OngletAnnonceListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletAnnonceListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletAnnonceListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
