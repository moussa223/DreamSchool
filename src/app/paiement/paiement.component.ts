import { Component, OnInit } from '@angular/core';
import {PaiementService} from "./paiement.service";
import {ClasseService} from "../classe/classe.service";
import {EleveService} from "../eleve/eleve.service";

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  tabs = ['Dashboard', 'Historique', 'Ajouter', 'Retard'];
  activeTab = this.tabs[0]; // Onglet actif par défaut
  classRoomData: any; // Contient les infos de toutes les classes de la Base de données
  studentData: any;
  paiementData: any; // Contiendra toutes les données de toutes les paiementes de la BDD
  // ----------------------------------------------------------------------------------------
  constructor(public paiementService:PaiementService,public classeService:ClasseService
  ,public eleveService:EleveService) { }
  // Fonction pour changer l'onglet actif
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  // ----------------------------------------------------------------------------------------
  ngOnInit(): void {
    //this.getAllClassRooms();
    this.getAllStudents();
    this.getAllPaiements();
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
  getAllStudents(){
    this.eleveService.getAllStudents().subscribe(
        (students) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.studentData = students;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------------------------------------------------------------------------
  CreatePaiement(){
    this.paiementService.CreatePaiement().subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          console.log(response);
        },
        (error) => {
          // Gérez les erreurs ici
          // console.error(error.error.message);
          console.error(error);
        }
    );
    window.location.reload();
  }
  // ----------------------------------------------------------------------------------------
  getAllPaiements(){
    this.paiementService.getAllPaiements().subscribe(
        (paiements) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.paiementData = paiements;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------------------------------------------------------------------------


}
