import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  tabs = ['Liste des messages', 'Autres'];
  activeTab = this.tabs[0]; // Onglet actif par défaut
  constructor() { }

  ngOnInit(): void {
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
