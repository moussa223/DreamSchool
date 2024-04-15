import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  isPopupOpen = false; // Le pop up d'ajout de classe est par défaut fermé

  constructor() { }

  ngOnInit(): void {
  }

  //-------------Fontion utilisée pour l'ouverture du pop up d'ajout d'un cours  ------------
  openPopup() {
    this.isPopupOpen = true;
  }
  closePopup() {
    this.isPopupOpen = false;
  }

}
