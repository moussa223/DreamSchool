import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletListeProfesseurComponent } from './onglet-liste-professeur.component';

describe('OngletListeProfesseurComponent', () => {
  let component: OngletListeProfesseurComponent;
  let fixture: ComponentFixture<OngletListeProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletListeProfesseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletListeProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
