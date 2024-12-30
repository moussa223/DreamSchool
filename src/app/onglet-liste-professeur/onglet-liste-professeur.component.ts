import { Component, OnInit } from '@angular/core';
import {CoursService} from "../cours/cours.service";
import {Router} from "@angular/router";
import {ProfesseurService} from "./professeur.service";

@Component({
  selector: 'app-onglet-liste-professeur',
  templateUrl: './onglet-liste-professeur.component.html',
  styleUrls: ['./onglet-liste-professeur.component.css']
})
export class OngletListeProfesseurComponent implements OnInit {
  // ------------------------------------------------------------------------------------
  isAddTeacherPopupOpen = false; // Le pop up d'ajout est par défaut fermé
  courseData: any; // Contient les infos de tous les cours de la base de données
  teacherData: any; // Contient les infos de tous les Professeurs de la base de données
    selectedTeacher: any | null = null;  // Le Teacher selectionné parmi la liste des teacher
    isTeacherDetailPopUpOpen = false // Le pop up d'ajout est par défaut fermé
    isAddCourseToTeacherPopUp = false // le pop up d'attribution du cours est fermé par défaut
    selectedTeacherCourses: any | null = null; // le cours selectionné du professeur
    isUpdateTeacherPopUpOpen = false; //  Le pop up est logiquement fermé par defaut
    updatedTeacherDto: any = {
        id: 0,
        lastName: '',
        firstName: '',
        email: '',
        nationality: '',
        cellPhone: '',
        phone: '',
        dateOfBirth: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
        courseIds: [
            0
        ]
    };
  // -------------------------------------------------------------------------------------
  constructor(public professeurService:ProfesseurService,private coursService: CoursService, private router:Router) { }
  // --------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.getAllCourses();
    this.getAllTeachers();
  }
  // -----------------------------------------------------------------------------------------
  // ----------------------Get All Courses --------------------------
  getAllCourses(){
    this.coursService.getAllCourses().subscribe(
        (courses) => {
          // On peut utiliser les données des étudiants ici
          this.courseData = courses;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
    //------------------Selected Class-------------------------------------------------------------------------
    selectTeacher(teacher: any): void {
        this.selectedTeacher = teacher;
        this.openTeacherDetailsPopUp();
    }
  //-------------------- Fonction Pop up de visualisation des infos d'une classe ---------------
    openTeacherDetailsPopUp(){
        this.isTeacherDetailPopUpOpen = true;
    }
    CloseTeacherDetailsPopUp(){
        this.isTeacherDetailPopUpOpen = false;
    }
  // -------------------- Fonction Pop up de visualisation des infos d'un planning ---------------
  openAddTeacherPopUp(){
    this.isAddTeacherPopupOpen = true;
  }
  CloseAddTeacherPopUp(){
    this.isAddTeacherPopupOpen = false;
  }
  //------------------------ Fonction pour rendre visible ou non le bloc d'ajout d'un cours au prof
    openAddCourseToTeacherPopUp(){
        this.isAddCourseToTeacherPopUp = true;
    }
    closeAddCourseToTeacherPopUp(){
        this.isAddCourseToTeacherPopUp = false;
    }
    // Add Courses To Teacher
    AddCoursesToTeacher(){
        this.professeurService.AddToCoursesToTeacher(this.selectedTeacher.id,this.professeurService.AddCourseToTeacherModel.courseIds).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                this.closeAddCourseToTeacherPopUp();
                // Rechargez la page après une réponse réussie
                window.location.reload();
            },
            (error) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
    // Suppression d'un cours du professeur parmi les autres cours
    DeleteTeacherCourses(teacherCourses: any): void{
        this.selectedTeacherCourses = teacherCourses;
        alert("Le cours "+this.selectedTeacherCourses.name + " sera supprimé des cours");
        this.DeleteCoursesToTeacher(); // On fait appel à la méthode de suppression
        // Je recharge la page
        window.location.reload();
    }
    // -------------------------------------------------------------------
    // Delete Course From Teacher, NB: Cette methode est appelée un peu plus haut, pas duppliquée
    DeleteCoursesToTeacher(){
        this.professeurService.DeleteCourseFromTeacher(this.selectedTeacher.id,this.selectedTeacherCourses.id).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                // Rechargez la page après une réponse réussie
                // window.location.reload(); // Je l'ai mis en commentaire car avec delete la requête rentre dans le
                // case Error je ne sais pas pourquoi mais je vais recharger la page en haut dans DeleteClass
            },
            (error) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
  // ------------------------- Create Teacher -------------------------
  CreateTeacher(){
    this.professeurService.CreateTeacher().subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          console.log(response);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // Création d'un Teacher
  onSubmit() {
    this.CreateTeacher();
    // Logique pour traiter les données du formulaire ici
    // fermeture du popup Après le traitement
    this.CloseAddTeacherPopUp();
    // Rechargez la page après une réponse réussie
    window.location.reload();
  }
  // ----------------------------------------------------------------------------------------
  // ----------------- get All Teachers-------------
  getAllTeachers(){
    this.professeurService.getAllTeachers().subscribe(
        (teachers) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(teachers);
          this.teacherData = teachers;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ---------------------------------------------------------
    // -------------Up date classRoom Pop Up -----------------------------------------------
    openUpdateTeacherPopup() {
        this.isUpdateTeacherPopUpOpen = true;
    }
    closeUpdateTeacherPopup() {
        this.isUpdateTeacherPopUpOpen = false;
    }
    // ----------------------------------------
    // Update teacher Method
    UpdateTeacher(){
        this.updatedTeacherDto.id = this.selectedTeacher.id; // L'id du Teacher que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
        this.professeurService.UpdateTeacher(this.selectedTeacher.id,this.updatedTeacherDto).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                // fermeture du popup Après le traitement
                //this.closePopup();
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
    // ----------------------- Selected Teacher To Delete --------------------------------
    selectTeacherToDelete(teacher:any): void{
        this.selectedTeacher = teacher;
        alert(this.selectedTeacher.lastName +" "+this.selectedTeacher.firstName +" sera supprimé");
        this.DeleteTeacher();
        // Je recharge la page
        window.location.reload();
    }
// --------------------------------------------------------------------------
// Delete Teacher, NB: Cette methode est appelée un peu plus haut, pas duppliquée
    DeleteTeacher(){
        this.professeurService.DeleteTeacher(this.selectedTeacher.id).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                // fermeture du popup Après le traitement
                //this.closePopup();
                // Rechargez la page après une réponse réussie
                // window.location.reload(); // Je l'ai mis en commentaire car avec delete la requête rentre dans le
                // case Error je ne sais pas pourquoi mais je vais recharger la page en haut dans DeleteClass
            },
            (error) => {
                // Gérez les erreurs ici
                // console.error(error.error.message);
                console.error(error);
            }
        );
    }
  //---------------------------------------------------------

}
