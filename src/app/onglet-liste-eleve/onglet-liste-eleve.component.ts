import { Component, OnInit } from '@angular/core';
import {EleveService} from "../eleve/eleve.service";
import {CreateEleveComponent} from "../create-eleve/create-eleve.component";// importation du composant d'ajout d'un élève

@Component({
  selector: 'app-onglet-liste-eleve',
  templateUrl: './onglet-liste-eleve.component.html',
  styleUrls: ['./onglet-liste-eleve.component.css']
})
export class OngletListeEleveComponent implements OnInit {
    test:any;
    studentsData: any;
    isPopupOpen = false; // le pop up d'ajout d'élève est par défaut fermé
    constructor(private eleveService:EleveService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents(){
    this.eleveService.getAllStudents().subscribe(
        (students) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(students);
          this.studentsData = students;
          console.log(this.studentsData[0].lastName);
            this.test = this.studentsData[0].lastName + " " + this.studentsData[0].firstName;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  //-------------------------
    openPopup() {
        this.isPopupOpen = true;
    }

    closePopup() {
        this.isPopupOpen = false;
    }
    onSubmit() {
        // Logique pour traiter les données du formulaire ici
        // Après traitement, vous pouvez fermer le popup
        this.closePopup();
    }
}
