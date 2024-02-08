import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent implements OnInit {
  tabs = ['Liste des élèves', 'Bulletins des élèves','Fiche des notes', 'Actions'];
  activeTab = this.tabs[0]; // Onglet actif par défaut
  constructor() { }
  // Fonction pour changer l'onglet actif
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  ngOnInit(): void {
  }

}
