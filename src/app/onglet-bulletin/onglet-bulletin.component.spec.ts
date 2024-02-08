import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletBulletinComponent } from './onglet-bulletin.component';

describe('OngletBulletinComponent', () => {
  let component: OngletBulletinComponent;
  let fixture: ComponentFixture<OngletBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletBulletinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
