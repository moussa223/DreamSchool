import { Component, OnInit } from '@angular/core';
import {PeriodSetupService} from "./period-setup.service";
import {ClasseService} from "../classe/classe.service";

@Component({
  selector: 'app-period-setup',
  templateUrl: './period-setup.component.html',
  styleUrls: ['./period-setup.component.css']
})
export class PeriodSetupComponent implements OnInit {
  tabs = ['Paramétrage des périodes', 'Liste des périodes'];
  activeTab = this.tabs[0]; // Onglet actif par défaut
  classRoomData: any; // Contient les infos de toutes les classes de la Base de données
  periodData: any; // Contiendra toutes les données de toutes les periodes de la BDD
  // ----------------------------------------------------------------------------------------
  constructor(public periodService:PeriodSetupService,public classeService:ClasseService) { }
  // Fonction pour changer l'onglet actif
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  // ----------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.getAllClassRooms();
    this.getAllPeriods();
  }
  // ----------------------------------------------------------------------------------------
  getAllClassRooms(){
    this.classeService.getAllClassRooms().subscribe(
        (classRooms) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.classRoomData = classRooms;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------------------------------------------------------------------------
  CreatePeriod(){
    this.periodService.CreatePeriod().subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          console.log(response);
          alert('Periode ajouté ! ');
          window.location.reload();
        },
        (error) => {
          // Gérez les erreurs ici
          // console.error(error.error.message);
          console.error(error);
          alert('Une erreur s est produite ! voir la console ');
        }
    );
    
  }
  // ----------------------------------------------------------------------------------------
  getAllPeriods(){
    this.periodService.getAllPeriods().subscribe(
        (periods) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.periodData = periods;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------
}
