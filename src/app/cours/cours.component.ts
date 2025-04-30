import { Component, OnInit } from '@angular/core';
import {CoursService} from "./cours.service";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  courseData:any;// Contient les infos de tous les cours de la base de données
  isPopupOpen = false; // Le pop up d'ajout de classe est par défaut fermé
  selectedCourse: any | null = null;  // La classe selectionné parmi la liste des classes

  constructor(public coursService: CoursService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  //-------------Fontion utilisée pour l'ouverture du pop up d'ajout d'un cours  ------------
  openPopup() {
    this.isPopupOpen = true;
  }
  closePopup() {
    this.isPopupOpen = false;
  }
  //------------------Selected Class-------------------------------------------------------------------------
  selectClass(course: any): void {
    this.selectedCourse = course;
  }
  // Création d'une classe
  onSubmit() {
    this.CreateCourse();
    // Logique pour traiter les données du formulaire ici
    // fermeture du popup Après le traitement
    this.closePopup();
    // Rechargez la page après une réponse réussie
    window.location.reload();
  }
  // ------------------------- Create Course -------------------------
  CreateCourse(){
    this.coursService.CreateCourse().subscribe(
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
  // Delete Course, NB: Cette methode est appelée un peu plus haut, pas duppliquée
  DeleteCourse(){
    this.coursService.DeleteCourse(this.selectedCourse.id).subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          console.log(response);
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
    // ----------------------- Selected Course To Delete --------------------------------
    selectCourseToDelete(Course:any): void{
        this.selectedCourse = Course;
        alert("Le cours "+this.selectedCourse.name + " sera supprimé");
        this.DeleteCourse();
        // Je recharge la page
        window.location.reload();
    }

}
