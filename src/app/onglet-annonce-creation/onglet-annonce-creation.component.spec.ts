import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletAnnonceCreationComponent } from './onglet-annonce-creation.component';

describe('OngletAnnonceCreationComponent', () => {
  let component: OngletAnnonceCreationComponent;
  let fixture: ComponentFixture<OngletAnnonceCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletAnnonceCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletAnnonceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
