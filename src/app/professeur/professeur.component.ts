import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit {

  tabs = ['Liste', 'Détails', 'Actions'];
  activeTab = this.tabs[0]; // Onglet actif par défaut
  constructor() { }
  // Fonction pour changer l'onglet actif
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  ngOnInit(): void {
  }

}
