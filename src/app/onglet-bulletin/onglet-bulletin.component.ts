import { Component, OnInit } from '@angular/core';
import {EleveService} from "../eleve/eleve.service";
import {ClasseService} from "../classe/classe.service";
import {NoteService} from "../note/note.service";
import {OngletBulletinService} from "./onglet-bulletin.service";
//import {any} from "codelyzer/util/function";
import {CoursService} from "../cours/cours.service";
import jsPDF from 'jspdf';

@Component({
  selector: 'app-onglet-bulletin',
  templateUrl: './onglet-bulletin.component.html',
  styleUrls: ['./onglet-bulletin.component.scss']
})
export class OngletBulletinComponent implements OnInit {
  isAddBulletinPopupOpen = false; // le pop up d'ajout de bulletin est par défaut fermé
    isGetBulletinPopupOpen = false;
// Ajouter un commentaire dans le fichier .ts pour actualiser le cache car l'affichge du bulletin Bug , a revoir
  studentsData: any;
  classRoomsData: any;
  selectedBulletin: any | null = null;
  selectedClass: any | null = null;
  bulletinData: any;
  studentNotesData: any;
  isUpdateBulletinPopUpOpen = false; //  Le pop up de fermeture est par fermé par defaut
  selectedStudent: any | null = null;  // L'élève selectionné parmi la liste des élèves
    selectedNote: any | null = null;
    selectedNoteIds: { [key: number]: number } = {};
    updatedBulletinDto: any = { // modèle pour la modification
          id: 0,
      titre: '',
      date: '',
      rang: '',
      moyenne: '',
      remarque: '',
      autres: '',
      courseIds: [
        0
      ],
      noteIds: [
        0
      ],
      studentIds: [
        0
      ]
  };
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;


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
          //console.log(students);
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
    // ----------------- Selected Bulletin to update -----------------------------
    selectBulletinToUpdate(bulletin: any): void {
        this.selectedBulletin = bulletin;
        this.openUpdateBulletinPopup();
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
          //console.log(classRoom);
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
                //console.log(studentNotes);
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
    // -------------------- Get Course Name only --------------------------
    getCourseCredits(courseId: number): string {
        const course = this.selectedBulletin.courses.find(course => course.id === courseId);
        return course ? course.credits : 'Cours inconnu';
    }
    // Création d'un bulletin
    onSubmit() {
        this.CreateBulletin();
        // Logique pour traiter les données du formulaire ici
        // fermeture du popup Après le traitement
        this.closePopup();
        // Rechargez la page après une réponse réussie
        window.location.reload();
    }
    // Modification d'un Bulletin
    onClickUpdateButton() {
        this.UpdateBulletin();
        // Logique pour traiter les données du formulaire ici
        // fermeture du popup Après le traitement
        this.closeUpdateBulletinPopup();
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
                //console.log(response);
            },
            (error) => {
                // Gérez les erreurs ici
                // console.error(error.error.message);
                console.error(error);
            }
        );
    }
  // ----------------------- Download Bulletin ------------------------------------
    //Nb il faut d'abord voir ou charger le tableau pour qu'il soit téléchargeable, c'est à dire que je dois pousser
    // l'utilisateur à cliquer sur le botuon voir avant de cliquer sur télécharger sinon j'aurai une erreur null reference
    downloadBulletin(index: number) {
      this.selectBulletin(this.bulletinData[index]);
        const bulletinId = index; // Identifiant du bulletin sélectionné
        const bulletin = this.bulletinData[bulletinId]; // Obtenez les données du bulletin à partir de l'index

        // Logique pour générer le PDF ou Excel du bulletin et le télécharger
        // Vous pouvez utiliser des bibliothèques comme jsPDF ou ExcelJS pour générer les fichiers PDF ou Excel respectivement
        // Exemple avec jsPDF pour le téléchargement d'un PDF
        const doc = new jsPDF();
        let yOffset = 10; // Décalage vertical initial

        // Ajoutez le titre du bulletin
        doc.text(`Titre du Bulletin: ${bulletin.titre}`, 10, yOffset);
        yOffset += 10; // Augmentez le décalage vertical

        // Ajoutez d'autres informations du bulletin
        doc.text(`Date: ${bulletin.date}`, 10, yOffset);
        yOffset += 10;

        doc.text(`Élève: ${bulletin.students[0]?.lastName || ''} ${bulletin.students[0]?.firstName || ''}`, 10, yOffset);
        yOffset += 10;

        doc.text(`Appréciation: ${bulletin.remarque || ''}`, 10, yOffset);
        yOffset += 10;

        // Ajoutez une ligne pour séparer les informations
        doc.line(10, yOffset, 200, yOffset);
        yOffset += 10;

        // Dessiner l'en-tête du tableau
        doc.text('Matière', 15, yOffset);
        doc.text('Note', 80, yOffset);

        yOffset += 5;

        // Dessiner une ligne sous l'en-tête
        doc.line(15, yOffset, 190, yOffset);
        yOffset += 10;

        // Ajoutez les détails de la table de notes avec vérification
        if (bulletin.notes && bulletin.notes.length > 0) {
            bulletin.notes.forEach((note, index) => {
                const courseName = note.courseIds && note.courseIds.length > 0 ? this.getCourseName(note.courseIds[0]) || 'Matière non spécifiée' : 'Matière non spécifiée';
                const noteObtenue = note.noteObtenue !== undefined && note.noteObtenue !== null ? note.noteObtenue : 'Note non spécifiée';

                // Dessiner le nom de la matière
                doc.text(courseName, 15, yOffset);

                // Dessiner la note obtenue
                doc.text(noteObtenue.toString(), 80, yOffset);

                yOffset += 7; // Augmentez le décalage vertical pour la prochaine ligne
            });

            // Ajoutez une ligne pour séparer les informations
            doc.line(10, yOffset, 200, yOffset);
            yOffset += 10;

            // Dessiner la moyenne
            doc.text('Moyenne', 15, yOffset);
            doc.text(bulletin.moyenne || '', 80, yOffset);
            yOffset += 10;

            // Dessiner le rang
            doc.text('Classement', 15, yOffset);
            doc.text(bulletin.rang || '', 80, yOffset);
        } else {
            // Gérer le cas où il n'y a pas de notes disponibles
            doc.text('Aucune note disponible', 15, yOffset);
            yOffset += 10;
        }

        // Sauvegardez le PDF
        doc.save(`Bulletin_${bulletinId}.pdf`);

        // TO DO afficher aussi le rang, le coefficient et Autres dans le pdf et ameliorer l'affichage
    }

    // Update classRoom Method
    UpdateBulletin(){
      this.updatedBulletinDto.id = this.selectedBulletin.id; // L'id du bulletin que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
        this.bulletinService.UpdateBulletin(this.selectedBulletin.id,this.updatedBulletinDto).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                //console.log(response);
                // fermeture du popup Après le traitement
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
    openUpdateBulletinPopup() {
        this.isUpdateBulletinPopUpOpen = true;
    }
    closeUpdateBulletinPopup() {
        this.isUpdateBulletinPopUpOpen = false;
    }
    // Delete Bulletin, NB: Cette methode est encore appelée par une autre fonction, pas duppliquée
    DeleteBulletin(){
        this.bulletinService.DeleteBulletin(this.selectedBulletin.id).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                //console.log(response);
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
    // ----------------------- Selected Bulletin To Delete --------------------------------
    selectBulletinToDelete(bulletin:any): void{
        this.selectedBulletin = bulletin;
        alert("Le bulletin "+this.selectedBulletin.titre + " sera supprimé");
        this.DeleteBulletin();
        // Je recharge la page
        window.location.reload();
    }
    // ----------------------------------------------------
    get filteredBulletins() {
  if (!this.bulletinData) return [];
  if (!this.searchTerm) return this.bulletinData;
  const term = this.searchTerm.toLowerCase();
  return this.bulletinData.filter(c => c.titre.toLowerCase().includes(term));
}


  // 📄 Pagination appliquée aux classes filtrées
  get paginatedBulletins() {
  if (!this.filteredBulletins || this.filteredBulletins.length === 0) {
    return [];
  }
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.filteredBulletins.slice(startIndex, endIndex);
}


  // Nombre total de pages après filtre
  get totalPages() {
    return Math.ceil(this.filteredBulletins.length / this.itemsPerPage);
  }

  // 🕹️ Navigation
  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  // 🔁 Remettre à la première page si on tape un nouveau mot
  onSearchChange() {
    this.currentPage = 1;
  }
}
