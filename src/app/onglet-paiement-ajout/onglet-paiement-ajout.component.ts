import { Component, OnInit } from '@angular/core';
import {PaiementService} from "../paiement/paiement.service";
import {ClasseService} from "../classe/classe.service";
import {EleveService} from "../eleve/eleve.service";
import {PeriodSetupService} from "../period-setup/period-setup.service";

@Component({
  selector: 'app-onglet-paiement-ajout',
  templateUrl: './onglet-paiement-ajout.component.html',
  styleUrls: ['./onglet-paiement-ajout.component.css']
})
export class OngletPaiementAjoutComponent implements OnInit {

  classRoomData: any; // Contient les infos de toutes les classes de la Base de données
  studentData: any;
  periodSetupData: any;
  paiementData: any; // Contiendra toutes les données de toutes les paiementes de la BDD
  // ----------------------------------------------------------------------------------------
  constructor(public paiementService:PaiementService,public classeService:ClasseService
      ,public eleveService:EleveService,public periodSetup:PeriodSetupService) { }
  // Fonction pour changer l'onglet actif
  // ----------------------------------------------------------------------------------------
  ngOnInit(): void {
    //this.getAllClassRooms();
    this.getAllStudents();
    this.getAllPeriodSetups();
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
    getAllPeriodSetups(){
        this.periodSetup.getAllPeriods().subscribe(
            (periodSetups) => {
                // Vous pouvez utiliser les données des étudiants ici
                this.periodSetupData = periodSetups;
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
