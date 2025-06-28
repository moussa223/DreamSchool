import { Component, OnInit } from '@angular/core';
import {NoteService} from "../note/note.service";
import {CoursService} from "../cours/cours.service";
import {EleveService} from "../eleve/eleve.service";

@Component({
  selector: 'app-onglet-notes',
  templateUrl: './onglet-notes.component.html',
  styleUrls: ['./onglet-notes.component.scss']
})
export class OngletNotesComponent implements OnInit {
  isAddNotePopupOpen = false; // le pop up d'ajout de bulletin est par défaut fermé
  courseData: any; // Contient les infos de tous les cours de la base de données
  studentsData:any; // Contient les infos de tous les élèves de la Bdd
    NoteData:any; // Contient les infos de toutes les notes
    selectedNote: any | null = null;
    isUpdateNotePopUpOpen = false; //  Le pop up de fermeture de classe est par fermé par defaut
    updatedNoteDto: any = { // modèle pour la modification d'une classe mais à voir si je peux directement utiliser classRoomModel.ClassRoomDto dans classe.service
      id: 0,
      date: '',
      total: '',
      noteObtenue: '',
      commentaires: '',
      autres: '',
      studentIds: [
        0 // Ex: si je remplace 0 par 1 , le premier cours de la liste sera selectionné par défaut
      ],
      courseIds: [
        0 // Ex: si je remplace 0 par 1 , le premier cours de la liste sera selectionné par défaut
      ]
  };

  constructor(public noteService:NoteService, private coursService:CoursService,public eleveService:EleveService) { }

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllStudents();
    this.getAllNotes();
  }
  // -------------------------------------
  openAddNotePopup() {
    this.isAddNotePopupOpen = true;
  }

  closePopup() {
    this.isAddNotePopupOpen = false;
  }
  // ---------------------------------------
  //------------------Selected Class-------------------------------------------------------------------------
    selectNoteToUpdate(note: any): void {
        this.selectedNote = note;
        this.openUpdateNotePopup();
        
    }
  // ------------------------------------
  // Création d'une classe
  onSubmit() {
    this.CreateNote();
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
          //console.log(courses);
          this.courseData = courses;
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
            },
            (error) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
  // ------------------------- Create Note -------------------------
  CreateNote(){
    this.noteService.CreateNote().subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          //console.log(response);
        },
        (error) => {
          // Gérez les erreurs ici
          // console.error(error.error.message);
          console.error(error);
        }
    );
  }
  // ----------------- get All Notes-------------
    getAllNotes(){
        this.noteService.getAllNotes().subscribe(
            (Notes) => {
                // Vous pouvez utiliser les données des étudiants ici
                //console.log(Notes);
                this.NoteData = Notes;
            },
            (error) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
    // Update Note Method
    UpdateNote(){
      this.updatedNoteDto.id = this.selectedNote.id; // L'id de la classe que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
        this.noteService.UpdateNote(this.selectedNote.id,this.updatedNoteDto).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                //console.log(response);
                // fermeture du popup Après le traitement
                this.closeUpdateNotePopup();
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
    openUpdateNotePopup() {
        this.isUpdateNotePopUpOpen = true;
    }
    closeUpdateNotePopup() {
        this.isUpdateNotePopUpOpen = false;
    }
}
