import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onglet-notes',
  templateUrl: './onglet-notes.component.html',
  styleUrls: ['./onglet-notes.component.scss']
})
export class OngletNotesComponent implements OnInit {
  isAddNotePopupOpen = false; // le pop up d'ajout de bulletin est par défaut fermé

  constructor() { }

  ngOnInit(): void {
  }
  // -------------------------------------
  openAddNotePopup() {
    this.isAddNotePopupOpen = true;
  }

  closePopup() {
    this.isAddNotePopupOpen = false;
  }
  // ------------------------------------

}
