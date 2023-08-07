import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit {
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
