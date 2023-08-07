import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletListeFamilleComponent } from './onglet-liste-famille.component';

describe('OngletListeFamilleComponent', () => {
  let component: OngletListeFamilleComponent;
  let fixture: ComponentFixture<OngletListeFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletListeFamilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletListeFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
