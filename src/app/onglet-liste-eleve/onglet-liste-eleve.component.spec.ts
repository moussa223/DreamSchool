import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletListeEleveComponent } from './onglet-liste-eleve.component';

describe('OngletListeEleveComponent', () => {
  let component: OngletListeEleveComponent;
  let fixture: ComponentFixture<OngletListeEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletListeEleveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletListeEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
