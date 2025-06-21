import { Component, OnInit } from '@angular/core';
import {SidebareComponent} from "../sidebare/sidebare.component";
import {JwtHelperService} from "@auth0/angular-jwt";
import {PaiementService} from "../paiement/paiement.service";
import {ClasseService} from "../classe/classe.service";
import {EleveService} from "../eleve/eleve.service";
import {PeriodSetupService} from "../period-setup/period-setup.service";
import { ProfesseurService } from 'app/onglet-liste-professeur/professeur.service';


@Component({
  selector: 'app-tableau-bord',
  templateUrl: './tableau-bord.component.html',
  styleUrls: ['./tableau-bord.component.css']
})
export class TableauBordComponent implements OnInit {

  userData: any; // Créez une variable pour stocker les données de l'utilisateur
  totalMontantPaye: any; // Montal total de tous les paiements reçus 
  paiementData: any;
  classRoomData: any; // Contient les infos de toutes les classes de la Base de données
  studentsData: any;
  teacherData: any; // Contient les infos de tous les Professeurs de la base de données
  constructor(public paiementService:PaiementService,public classeService:ClasseService
        ,public eleveService:EleveService,public periodService:PeriodSetupService,
        public professeurService:ProfesseurService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('usingsecretkeyforapp');
        const jwtHelper = new JwtHelperService();
        // Décodez le token
        this.userData = jwtHelper.decodeToken(token);
        // console.log("l email du user est: "+this.userData.email);
        // console.log("Le nom du user est: "+this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
        this.getAllPaiements();
        this.getAllClassRooms();
        this.getAllStudents();
        this.getAllTeachers();
  }

  // ----------------------------------------------------------------------------------------
  getAllPaiements(){
    this.paiementService.getAllPaiements().subscribe(
        (paiements) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.paiementData = paiements;
            // Conversion sécurisée de string vers number, et calcul de la somme
            this.totalMontantPaye = this.paiementData.reduce((total, paiement) => {
                const montant = parseFloat(paiement.montantPaye?.toString().replace(/\s/g, '').replace(',', '.')) || 0;
                return total + montant;
            }, 0);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------- get All ClassRooms-------------
  getAllClassRooms(){
    this.classeService.getAllClassRooms().subscribe(
        (classRooms) => {
          // Vous pouvez utiliser les données des étudiants ici
          // console.log(classRooms);
          this.classRoomData = classRooms;
          // console.log(this.classRoomData[0].name);
        
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ------------------- Get All Students --------------------------------------------
  getAllStudents(){
    this.eleveService.getAllStudents().subscribe(
        (students) => {
          // Vous pouvez utiliser les données des étudiants ici
          //console.log(students);
          this.studentsData = students;
          //console.log(this.studentsData[0].lastName);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------- get All Teachers-------------
  getAllTeachers(){
    this.professeurService.getAllTeachers().subscribe(
        (teachers) => {
          // Vous pouvez utiliser les données des étudiants ici
          //console.log(teachers);
          this.teacherData = teachers;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
}
