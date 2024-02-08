import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletNotesComponent } from './onglet-notes.component';

describe('OngletNotesComponent', () => {
  let component: OngletNotesComponent;
  let fixture: ComponentFixture<OngletNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
