import { Component, OnInit } from '@angular/core';
import {EleveService} from "../eleve/eleve.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  studentsData: any;
  selectedStudent: any | null = null;  // L'élève selectionné parmi la liste des élèves
  selectedStudentContent: any[] = [];
  filteredStudents: any[] = []; // Après recherche et tri
  paginatedStudents: any[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  isPopupOpen = false; // le pop up est par défaut fermé
  currentPath: string = ''; // Utilisé pour la navigation dans le dossier principal de l'élève
  newFolderName: string = ''; // Utilisé pour la création d'un sous dossier dans le dossier principal de l'élève selecttionné
  selectedFile: File | null = null; // le fichier que l'on veut Uploader


  

  constructor(public eleveService:EleveService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  //-------------------------Pop Up ------------------------------------------------
  // -------------Fontion utilisée pour l'ouverture du pop up d'un student  ------------
    openPopup() {
        this.isPopupOpen = true;
    }

    closePopup() {
        this.isPopupOpen = false;
    }
  // ------------------- Get All Students --------------------------------------------
  getAllStudents(){
    this.eleveService.getAllStudents().subscribe(
        (students) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(students);
          this.studentsData = students;
          this.studentsData.sort((a, b) => a.lastName.localeCompare(b.lastName));
          this.filterStudents();
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
    
  }
  // ---------------------------------------------------------------
  //------------------Selected Student-------------------------------------------------------------------------
    selectStudent(student: any): void {
        this.selectedStudent = student;
        this.loadStudentFolderContentWithNavigation(student.lastName, student.firstName);
        this.openPopup();
    }
  // ---------------------------------------------------------------------------------------------------------
  filterStudents() {
  const search = this.searchText.toLowerCase();
  this.filteredStudents = this.studentsData.filter(s =>
    (`${s.lastName} ${s.firstName}`.toLowerCase().includes(search))
  );
  this.setupPagination();
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.pageSize);
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedStudents = this.filteredStudents.slice(start, end);
  }
  //------------ Check Or Create Folders For Student if not exist
  createMissingFolders() {
  this.eleveService.createStudentFolders(this.studentsData).subscribe(
      (results) => {
        console.log("Résultat :", results);
        alert("Traitement terminé. Vérifie la console.");
      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
  }
  // -------- Get student folder content -------------------
  loadStudentFolderContent(lastName: string, firstName: string) {
  this.http.get<any[]>(`https://localhost:7012/api/student/folderContent?lastName=${lastName}&firstName=${firstName}`)
    .subscribe({
      next: (content) => {
        this.selectedStudentContent = content;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du dossier :', error);
        this.selectedStudentContent = [];
      }
    });
  }
  // -----------------------------------------------------------
  loadStudentFolderContentWithNavigation(lastName: string, firstName: string) {
  this.currentPath = `${lastName}_${firstName}`; // Important, Ne pas oublier de remplacer /home/baba/Downloads/ 
  // par le chemin Downloads du serveur sur le quel l'application est hebergé si c'est un serveur Windows ou Linux
  this.fetchFolderContent(this.currentPath);
  }

  fetchFolderContent(path: string) {
    this.eleveService.getFolderContent(path).subscribe({
      next: (content) => {
        this.selectedStudentContent = content;
        this.currentPath = path;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du dossier :', error);
      }
    });
  }
  // -----------------Création d'un sous dossier dans le dossier principal de l'élève selectionné -----------------------------------
  createNewSubFolder() {
  if (!this.newFolderName.trim() || !this.currentPath) {
    alert('Veuillez saisir un nom de dossier et vérifier le chemin.');
    return;
  }

  this.eleveService.createSubFolder(this.currentPath, this.newFolderName).subscribe(
    () => {
      alert('Dossier créé avec succès');
      this.loadContentAtCurrentPath();  // Pour recharger le contenu du dossier
      this.newFolderName = ''; // Réinitialiser le champ
    },
    (error) => {
      console.error('Erreur de création de dossier :', error);
      // alert('Erreur lors de la création du dossier'); // Corriger ce bug là, le dossier est créé mais l'erreur se declenche
      window.location.reload();
    }
  );
  }

  loadContentAtCurrentPath() {
    this.eleveService.getFolderContent(this.currentPath).subscribe(
      (content) => {
        this.selectedStudentContent = content;
      },
      (error) => {
        console.error('Erreur de chargement :', error);
      }
    );
  }

  // -------------------------Ajout du fil d'ariane pour la navigation en arrière ou avant ---------------------------
  getBreadcrumbParts(): string[] {
  // Découpe le chemin en segments, exemple : "Toure_Moussa/Devoirs/Maths" => ["Toure_Moussa", "Devoirs", "Maths"]
  return this.currentPath ? this.currentPath.split('/') : [];
  }

  getFullPathUntil(index: number): string {
    // Reconstitue le chemin jusqu’à l’index donné, exemple : index=1 => "Toure_Moussa/Devoirs"
    return this.getBreadcrumbParts().slice(0, index + 1).join('/');
  }
  // ---------------Méthode pour sélectionner le fichier ------------------------------
  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
  }
  uploadSelectedFile() {
  if (!this.selectedFile) {
    alert('Aucun fichier sélectionné.');
    return;
  }

  this.eleveService.uploadFile(this.selectedFile, this.currentPath).subscribe({
    next: () => {
      alert('Fichier uploadé avec succès.');
      this.fetchFolderContent(this.currentPath); // Refresh le dossier après l’upload
      this.selectedFile = null;
    },
    error: (error) => {
      console.error('Erreur lors de l’upload :', error);
      //alert('Échec de l’upload.'); // Corriger ce bug là, changer le retour du serveur, le dossier est créé mais l'erreur se declenche
      window.location.reload();
    }
    });
  }

  // -----------------------------------------------------------------------------------

}
