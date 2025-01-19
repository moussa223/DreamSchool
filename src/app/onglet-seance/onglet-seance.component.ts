import { Component, OnInit } from '@angular/core';
import {ClasseService} from "../classe/classe.service";
import {CoursService} from "../cours/cours.service";
import {Router} from "@angular/router";
import {PresenceService} from "../presence/presence.service";
import {EleveService} from "../eleve/eleve.service";

@Component({
  selector: 'app-onglet-seance',
  templateUrl: './onglet-seance.component.html',
  styleUrls: ['./onglet-seance.component.css']
})
export class OngletSeanceComponent implements OnInit {
  classRoomData: any; // Contient les infos de toutes les classes de la Base de données
  courseData: any; // Contient les infos de tous les cours de la base de données
    studentsData: any;
    seanceData: any; // Contient les infos de toutes les seances de la base de données
    selectedSeance: any | null = null;  // La seance selectionnée parmi la liste des seances
  isAddSeancePopUpOpen = false; // Par défaut le pop Up est fermé
    isCheckSeancePresencePopUpOpen = false; // Par défaut le pop Up est fermé
    selectedClass: any | null = null; // Variable pour stocker la classe sélectionnée
    selectedClassId: any; // ID de la classe sélectionnée
    filteredStudents: any[] = []; // Liste des élèves filtrés par la classe sélectionnée

    constructor(public classeService:ClasseService, private coursService: CoursService,public eleveService:EleveService,
              public presenceService:PresenceService,private router:Router) { }

  ngOnInit(): void {
    this.getAllClassRooms();
    this.getAllCourses();
    this.getAllStudents();
    this.getAllSeances();
  }
    // Fonction appelée lors de la sélection d'une classe
    onClassSelect(classRoom: any): void {
        this.selectedClass = classRoom;
        this.selectedClassId = classRoom.id; // Mise à jour de l'ID de la classe sélectionnée
        console.log('Classe sélectionnée avec l\'ID :', this.selectedClass.id);
        console.log('Classe sélectionnée avec l\'ID :', this.selectedClass);

        // Filtrer les élèves en fonction de la classe sélectionnée
        this.filterStudentsByClass();
    }

    // Fonction pour filtrer les étudiants en fonction de la classe sélectionnée
    filterStudentsByClass() {
        if (this.selectedClassId) {
            // Filtrer les étudiants dont l'ID de la classe figure dans classRooms
            this.filteredStudents = this.studentsData.filter(student =>
                student.classRooms.some(classRoom => classRoom.id === this.selectedClassId)
            );
            console.log('Étudiants filtrés:', this.filteredStudents);
        } else {
            this.filteredStudents = []; // Si aucune classe n'est sélectionnée, vider la liste
        }
    }


    // ----------------- get All ClassRooms-------------------------------------------------------------------------------
  getAllClassRooms(){
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
  // ----------------------Get All Courses -----------------------------------------------------------------------------
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
  // ---------------- Add Seance Pop Up --------------------------------------------------------------------------------
  OpenAddSeancePopUp(){
    this.isAddSeancePopUpOpen = true;
  }
  CloseAddSeancePopUp(){
    this.isAddSeancePopUpOpen = false;
  }
  // ----------------- Check Presence for seance Pop Up ----------------------------------------------------------------
    OpenCheckSeancePresencePopUp(){
     this.isCheckSeancePresencePopUpOpen = true;
    }
    CloseCheckSeancePresencePopUp(){
     this.isCheckSeancePresencePopUpOpen = false;
    }
    //------------------Selected Class-------------------------------------------------------------------------
    selectSeance(seance: any): void {
        this.selectedSeance = seance;
        this.OpenCheckSeancePresencePopUp();
    }
    // ------------------------- Create Seance -------------------------------------------------------------------------
    CreateSeance(){
        this.presenceService.CreateSeance().subscribe(
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
    // Création d'une seance
    onSubmit() {
        this.CreateSeance();
        // Logique pour traiter les données du formulaire ici
        // fermeture du popup Après le traitement
        this.CloseAddSeancePopUp();
        // Rechargez la page après une réponse réussie
        window.location.reload();
    }
    // ----------------- get All Seances--------------------------------------------------------------------------------
    getAllSeances(){
        this.presenceService.getAllSeances().subscribe(
            (seances) => {
                // Vous pouvez utiliser les données des étudiants ici
                console.log(seances);
                this.seanceData = seances;
            },
            (error) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
    //------------------------------------------------------------------------------------------------------------------
    savePresences() {
        if (!this.selectedSeance) {
            alert("Veuillez sélectionner une séance.");
            return;
        }

        // Récupérer les IDs des étudiants présents et absents
        const presentStudents = this.filteredStudents
            .filter(student => student.status === 'Présent')
            .map(student => student.id);

        const absentStudents = this.filteredStudents
            .filter(student => student.status === 'Absent')
            .map(student => student.id);

        if (!presentStudents.length && !absentStudents.length) {
            alert("Aucune présence ou absence à enregistrer.");
            return;
        }

        // Enregistrer les étudiants présents
        if (presentStudents.length) {
            this.savePresenceForStatus(presentStudents, 'Présent');
        }

        // Enregistrer les étudiants absents
        if (absentStudents.length) {
            this.savePresenceForStatus(absentStudents, 'Absent');
        }
    }

    savePresenceForStatus(studentIds: number[], status: string) {
        this.presenceService.PresenceModel.presenceDto = {
            id: 0,
            statut: status, // "Présent" ou "Absent"
            commentaires: '',
            autres: '',
            seanceIds: [this.selectedSeance.id], // ID de la séance sélectionnée
            studentIds: studentIds             // Liste des étudiants pour ce statut
        };

        console.log(`Données de présence pour le statut "${status}" :`, this.presenceService.PresenceModel);

        this.presenceService.CreatePresence().subscribe(
            response => {
                console.log(`Présences enregistrées pour le statut "${status}" :`, response);
                alert(`Présences enregistrées avec succès pour le statut "${status}" !`);
            },
            error => {
                console.error(`Erreur lors de l'enregistrement des présences pour le statut "${status}" :`, error);
                alert(`Une erreur s'est produite lors de l'enregistrement des présences pour le statut "${status}".`);
            }
        );
    }

}
