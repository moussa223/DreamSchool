import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletSeanceComponent } from './onglet-seance.component';

describe('OngletSeanceComponent', () => {
  let component: OngletSeanceComponent;
  let fixture: ComponentFixture<OngletSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletSeanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
