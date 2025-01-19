import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  tabs = ['Liste des séances', 'Gestion des présences', 'Actions'];
  activeTab = this.tabs[0]; // Onglet actif par défaut
  constructor() { }
  // Fonction pour changer l'onglet actif
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
  }

}
