import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClasseService} from "./classe.service";
import {CoursService} from "../cours/cours.service";
import {response} from "express";

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  test:any;
  classRoomData: any; // Contient les infos de toutes les classes de la Base de données
  courseData: any; // Contient les infos de tous les cours de la base de données
  isPopupOpen = false; // Le pop up d'ajout de classe est par défaut fermé
  isUpdateClassPopUpOpen = false; //  Le pop up de fermeture de classe est par fermé par defaut
  isClassPopUpOpen = false;
  isAddCoursesToClassPopUpOpen = false; // Pop d'ajout d'un cours à une classe
  selectedClass: any | null = null;  // La classe selectionné parmi la liste des classes
  updatedClassRoomDto: any = { // modèle pour la modification d'une classe mais à voir si je peux directement utiliser classRoomModel.ClassRoomDto dans classe.service
          id: 0,
          name: '',
          startDate: '',
          endDate: '',
          capacity: 0,
          levels: '',
          infos: '',
          courseIds: [
              0 // Ex: si je remplace 0 par 1 , le premier cours de la liste sera selectionné par défaut
          ]
  };
  constructor(public classeService:ClasseService, private coursService: CoursService, private router:Router) { }

  ngOnInit(): void {
    this.getAllClassRooms();
    this.getAllCourses();
  }
  // ----------------- get All ClassRooms-------------
  getAllClassRooms(){
    this.classeService.getAllClassRooms().subscribe(
        (classRooms) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(classRooms);
          this.classRoomData = classRooms;
          console.log(this.classRoomData[0].name);
          this.test = this.classRoomData[0].levels + " " + this.classRoomData[0].name;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
    //-------------Fontion utilisée pour l'ouverture du pop up d'ajout d'une classe  ------------
    openPopup() {
        this.isPopupOpen = true;
    }
    closePopup() {
        this.isPopupOpen = false;
    }
    //-------------------- Fonction Pop up de visualisation des infos d'une classe ---------------
    openClassDetailsPopUp(){
      this.isClassPopUpOpen = true;
    }
    CloseClassDetailsPopUp(){
      this.isClassPopUpOpen = false;
    }
    //------------------Selected Class-------------------------------------------------------------------------
    selectClass(classRoom: any): void {
        this.selectedClass = classRoom;
        this.openClassDetailsPopUp();
    }
    //
    onSubmit() {
      this.CreateClassRoom();
        // Logique pour traiter les données du formulaire ici
        // fermeture du popup Après le traitement
        this.closePopup();
        // Rechargez la page après une réponse réussie
        window.location.reload();
    }
    // ----------------------Get All Courses --------------------------
    getAllCourses(){
        this.coursService.getAllCourses().subscribe(
            (courses) => {
                // Vous pouvez utiliser les données des étudiants ici
                console.log(courses);
                this.courseData = courses;
            },
            (error) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
    // ------------------------- Create ClassRoom -------------------------
    CreateClassRoom(){
      this.classeService.CreateClassRoom().subscribe(
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
    }
    // Update classRoom Method
    UpdateClassRoom(){
      this.updatedClassRoomDto.id = this.selectedClass.id; // L'id de la classe que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
        this.classeService.UpdateClassRoom(this.selectedClass.id,this.updatedClassRoomDto).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                // fermeture du popup Après le traitement
                this.closePopup();
                // Rechargez la page après une réponse réussie
                window.location.reload();
            },
            (error) => {
                // Gérez les erreurs ici
                // console.error(error.error.message);
                console.error(error);
            }
        );
    }
    // Add Courses To ClassRoom
    AddCoursesToClassRoom(){
        this.classeService.AddToCoursesToClassRoom(this.selectedClass.id,this.classeService.AddCourseToClassRoomModel.courseIds).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                // fermeture du popup Après le traitement
                // this.closePopup();
                this.closeAddCoursesToClassPopup();
                // Rechargez la page après une réponse réussie
                window.location.reload();
            },
            (error) => {
                // Gérez les erreurs ici
                // console.error(error.error.message);
                console.error(error);
            }
        );
    }
    // -------------Up date classRoom Pop Up -----------------------------------------------
    openUpdateClassPopup() {
        this.isUpdateClassPopUpOpen = true;
    }
    closeUpdateClassPopup() {
        this.isUpdateClassPopUpOpen = false;
    }
    // --------------- Add Courses To ClassRoom Pop Up ----------------------
    openAddCoursesToClassPopup(){
      this.isAddCoursesToClassPopUpOpen = true;
    }
    closeAddCoursesToClassPopup(){
      this.isAddCoursesToClassPopUpOpen = false;
    }
}
