import { Component, OnInit } from '@angular/core';
import {EleveService} from "../eleve/eleve.service";
import {ClasseService} from "../classe/classe.service";
import {NoteService} from "../note/note.service";
import {OngletBulletinService} from "./onglet-bulletin.service";
import {any} from "codelyzer/util/function";
import {CoursService} from "../cours/cours.service";

@Component({
  selector: 'app-onglet-bulletin',
  templateUrl: './onglet-bulletin.component.html',
  styleUrls: ['./onglet-bulletin.component.scss']
})
export class OngletBulletinComponent implements OnInit {
  isAddBulletinPopupOpen = false; // le pop up d'ajout de bulletin est par défaut fermé
    isGetBulletinPopupOpen = false;

  studentsData: any;
  classRoomsData: any;
  selectedBulletin: any | null = null;
  selectedClass: any | null = null;
  bulletinData: any;
  studentNotesData: any;
  selectedStudent: any | null = null;  // L'élève selectionné parmi la liste des élèves
    selectedNote: any | null = null;
    selectedNoteIds: { [key: number]: number } = {};


  constructor(public eleveService:EleveService,public classService:ClasseService,public noteService:NoteService,public bulletinService:OngletBulletinService, public coursService:CoursService) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllBulletins();
  }
  // --------------Debut Pop Up Add Bulletin-----------------------
  openAddBulletinPopup() {
    this.isAddBulletinPopupOpen = true;
  }
  closePopup() {
    this.isAddBulletinPopupOpen = false;
  }
  // -------------Debut Get Bulletin pop Up ----------------------
    openGetBulletinPopup() {
        this.isGetBulletinPopupOpen = true;
    }
    closeGetPopup() {
        this.isGetBulletinPopupOpen = false;
    }
  //----------------- Get All Bulletin ---------------------------------
    // ----------------- get All Bulletins-------------
    getAllBulletins(){
        this.bulletinService.getAllBulletins().subscribe(
            (bulletins) => {
                this.bulletinData = bulletins;
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
          console.log(students);
          this.studentsData = students;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  //------------------Selected Student-------------------------------------------------------------------------
  selectStudent(student: any): void {
    this.selectedStudent = student;
    this.getClassRoomById(this.selectedStudent.classRooms[0].id);
    this.getNoteForStudentByStudentId(this.selectedStudent.id);
  }
  // ----------------- Selected Bulletin -----------------------------
    selectBulletin(bulletin: any): void {
        this.selectedBulletin = bulletin;
        this.openGetBulletinPopup();
    }
  // --------------------- Get For each Note Select List the Selected Note Id ------------------------------------------
    // Méthode pour obtenir uniquement les IDs des notes sélectionnées
    getSelectedNoteIds(): number[] {
        return Object.values(this.selectedNoteIds).filter(id => id !== 0);
    }
    // ------------------ Get classRoom by id -----------------------------------------
  getClassRoomById(classRoomId: number) {
    // Utilisez votre service pour récupérer les données de la classe en fonction de l'ID
    // Suppose que vous avez une méthode getClassRoomById dans votre service EleveService
    this.classService.GetClassRoom(classRoomId).subscribe(
        (classRoom) => {
          console.log(classRoom);
          this.classRoomsData = classRoom;
        },
        (error) => {
          console.error(error);
        }
    );
  }
  // -------------------Get Note for student By Id  ------------------------------------------------------
    getNoteForStudentByStudentId(studentId: number) {
        // Utilisez votre service pour récupérer les données de la classe en fonction de l'ID
        // Suppose que vous avez une méthode getClassRoomById dans votre service EleveService
        this.noteService.GetNotesForStudent(studentId).subscribe(
            (studentNotes) => {
                console.log(studentNotes);
                this.studentNotesData = studentNotes;
            },
            (error) => {
                console.error(error);
            }
        );
    }
    // -------------------- Get Course Name only --------------------------
    getCourseName(courseId: number): string {
        const course = this.selectedBulletin.courses.find(course => course.id === courseId);
        return course ? course.name : 'Cours inconnu';
    }
    // Création d'une classe
    onSubmit() {
        this.CreateBulletin();
        // Logique pour traiter les données du formulaire ici
        // fermeture du popup Après le traitement
        this.closePopup();
        // Rechargez la page après une réponse réussie
        window.location.reload();
    }
    // ------------------------- Create Bulletin -------------------------
    CreateBulletin(){
        this.bulletinService.bulletinModel.bulletinDto.studentIds = [this.selectedStudent.id]
        // Réinitialisez la liste des ids des cours à chaque fois que vous créez un nouveau bulletin
        this.bulletinService.bulletinModel.bulletinDto.courseIds = [];
        // Bouclez à travers les cours sélectionnés
        for (let studentClassRoomCourse of this.classRoomsData.courses) {
            // Ajoutez l'id du cours à la liste des ids des cours dans bulletinDto
            this.bulletinService.bulletinModel.bulletinDto.courseIds.push(studentClassRoomCourse.id);
        }
        // Réinitialisez la liste des ids des cours à chaque fois que vous créez un nouveau bulletin
        //this.bulletinService.bulletinModel.bulletinDto.noteIds = [];
        // Bouclez à travers les cours sélectionnés
        //for (let studentNote of this.studentNotesData) {
            // Ajoutez l'id du cours à la liste des ids des cours dans bulletinDto
          //  this.bulletinService.bulletinModel.bulletinDto.noteIds.push(studentNote.id);
        //}
        this.bulletinService.bulletinModel.bulletinDto.noteIds = this.getSelectedNoteIds();
        this.bulletinService.CreateBulletin().subscribe(
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
  // -----------------------------------------------------------

}
