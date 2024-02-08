import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onglet-bulletin',
  templateUrl: './onglet-bulletin.component.html',
  styleUrls: ['./onglet-bulletin.component.scss']
})
export class OngletBulletinComponent implements OnInit {
  isAddBulletinPopupOpen = false; // le pop up d'ajout de bulletin est par défaut fermé

  constructor() { }

  ngOnInit(): void {
  }
  // -------------------------------------
  openAddBulletinPopup() {
    this.isAddBulletinPopupOpen = true;
  }

  closePopup() {
    this.isAddBulletinPopupOpen = false;
  }
  // ------------------------------------


}
