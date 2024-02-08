import { Component, OnInit } from '@angular/core';
import {EleveService} from "../eleve/eleve.service";
import {CreateEleveComponent} from "../create-eleve/create-eleve.component";
import {ClasseService} from "../classe/classe.service";
import {Router} from "@angular/router";

// importation du composant d'ajout d'un élève

@Component({
  selector: 'app-onglet-liste-eleve',
  templateUrl: './onglet-liste-eleve.component.html',
  styleUrls: ['./onglet-liste-eleve.component.css']
})
export class OngletListeEleveComponent implements OnInit {
    test:any;
    studentsData: any;
    classRoomData: any;
    isPopupOpen = false; // le pop up d'ajout d'élève est par défaut fermé
    isUpdateStudentPopUpOpen = false; //  Le pop up de fermeture de Update student est par fermé par defaut
    isStudentPopUpOpen = false;
    isAddClassRoomsToStudentPopUpOpen = false; // Pop d'ajout d'une classe à un élève
    selectedStudent: any | null = null;  // L'élève selectionné parmi la liste des élèves
    selectedStudentClassRooms: any | null = null; // La classe  selectionnée de L'élève qui va permettre par exemple de supprimer une classe parmi les classes de L'élève
    updatedStudentDto: any = { // modèle pour la modification d'un student
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
        classRoomIds: [
            0
        ]
    };

    constructor(public eleveService:EleveService,public classeService:ClasseService,private router:Router) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllClassRoom();
  }

  // ------------------- Get All Students --------------------------------------------
  getAllStudents(){
    this.eleveService.getAllStudents().subscribe(
        (students) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(students);
          this.studentsData = students;
          //console.log(this.studentsData[0].lastName);
            this.test = this.studentsData[0].lastName + " " + this.studentsData[0].firstName;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // -------------Fontion utilisée pour l'ouverture du pop up d'ajout d'un student  ------------
    openPopup() {
        this.isPopupOpen = true;
    }

    closePopup() {
        this.isPopupOpen = false;
    }
    //-------------------- Fonction Pop up de visualisation des infos d'une classe ---------------
    openStudentDetailsPopUp(){
        this.isStudentPopUpOpen = true;
    }
    CloseStudentDetailsPopUp(){
        this.isStudentPopUpOpen = false;
    }
    //------------------Selected Student-------------------------------------------------------------------------
    selectStudent(student: any): void {
        this.selectedStudent = student;
        this.openStudentDetailsPopUp();
    }
    // ----------------------- Selected Student To Delete --------------------------------
    selectStudentToDelete(student:any): void{
        this.selectedStudent = student;
        alert("L'élève " + this.selectedStudent.lastName + " " + this.selectedStudent.firstName + " sera supprimé");
        this.DeleteStudent();
        // Je recharge la page
        window.location.reload();
    }
    // ------------- Suppression d'une classe d'un élève parmi les autres Classe s'il en existe ---------------
    DeleteStudentClassRooms(studentClassRooms: any): void{
        this.selectedStudentClassRooms = studentClassRooms;
        alert("La classe "+this.selectedStudentClassRooms.name + " sera supprimé de cet élève");
        this.DeleteClassRoomToStudent(); // On fait appel à la méthode de suppression
        // Je recharge la page
        window.location.reload();
    }
    // -------------------------------- Création d'un élève ----------------------------------------------
    onSubmit() {
        this.CreateStudent();
        // Logique pour traiter les données du formulaire ici
        // fermeture du popup Après le traitement
        this.closePopup();
        // Rechargez la page après une réponse réussie
        window.location.reload();
    }
    // ----------------------------------------- Get All ClassRooms -----------------------------------
    getAllClassRoom(){
        this.classeService.getAllClassRooms().subscribe(
            (classRooms) => {
                // Vous pouvez utiliser les données des étudiants ici
                console.log(classRooms);
                this.classRoomData = classRooms;
            },
            (error) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
    // ----------------------------------- Create Student ---------------------------------
    CreateStudent(){
        this.eleveService.CreateStudent().subscribe(
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
    // -------------------------------- Update Student Method ---------------------------
    UpdateStudent(){
        this.updatedStudentDto.id = this.selectedStudent.id; // L'id de la classe que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
        this.eleveService.UpdateStudent(this.selectedStudent.id,this.updatedStudentDto).subscribe(
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
    // -------------------------- Add ClassRoom To Student ------------------------------------
    AddClassRoomToStudent(){
        this.eleveService.AddClassRoomsToStudent(this.selectedStudent.id,this.eleveService.AddClassRoomToStudentModel.classRoomIds).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                // fermeture du popup Après le traitement
                // this.closePopup();
                this.closeAddClassRoomsToStudentPopup();
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
    // --------------------- Delete "Studen"t not ClassRoom For student , NB: Cette methode est appelée un peu plus haut, pas duppliquée
    DeleteStudent(){
        this.eleveService.DeleteStudent(this.selectedStudent.id).subscribe(
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
    // ---------------- Delete ClassRoom From student, NB: Cette methode est appelée un peu plus haut, pas duppliquée --
    DeleteClassRoomToStudent(){
        this.eleveService.DeleteClassRoomFromStudent(this.selectedStudent.id,this.selectedStudentClassRooms.id).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                // fermeture du popup Après le traitement
                this.closePopup();
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
    // ---------------------------- Up date classRoom Pop Up -----------------------------------------------
    openUpdateStudentPopup() {
        this.isUpdateStudentPopUpOpen = true;
    }
    closeUpdateClassPopup() {
        this.isUpdateStudentPopUpOpen = false;
    }
    // ------------------------------- Add ClassRoom To ClassRoom Pop Up ----------------------
    openAddClassRoomsToStudentPopup(){
        this.isAddClassRoomsToStudentPopUpOpen = true;
    }
    closeAddClassRoomsToStudentPopup(){
        this.isAddClassRoomsToStudentPopUpOpen = false;
    }
}
