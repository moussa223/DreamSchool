import { Component, OnInit } from '@angular/core';
import { CalendrierService } from "./calendrier.service";
import { ActivatedRoute } from "@angular/router";
import {CoursService} from "../cours/cours.service";
import {ClasseService} from "../classe/classe.service";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-calendrier',
    templateUrl: './calendrier.component.html',
    styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
    courseData: any; // Contient les infos de tous les cours de la base de données
    classRoomData: any; // Contient les infos de toutes les classes de la base de données
    PlanningData: any; // Données initiales
    GroupedPlannings: any = {}; // Plannings regroupés par classe
    classesList: string[] = []; // Liste des classes
    selectedClass: string | null = null; // Classe sélectionnée
    selectedPlanning: any | null = null;  // Le planning selectionné parmi la liste des plannings d'une classe
    isPlanningDetailPopupOpen = false; // Le pop up de detail d'un planning est par défaut fermé
    displayedPlannings: any[] = []; // Plannings affichés pour une classe
    currentPage: number = 1; // Page actuelle
    itemsPerPage: number = 5; // Nombre d'éléments par page
    //-------
    isUpdatePlanningPopUpOpen = false; //  Le pop up de fermeture de l'update du Planning est par fermé par defaut
    updatedPlanningDto: any = {
        id: 0,
        name: '',
        statut: '',
        pdfFile: '',
        commentaires: '',
        autres: '',
        semaineDu: '',
        semaineAu: '',
        className: '',
        lundi8h: '',
        lundi9h: '',
        lundi10h: '',
        lundi11h: '',
        lundi12h: '',
        lundi13h: '',
        lundi14h: '',
        lundi15h: '',
        lundi16h: '',
        lundi17h: '',
        lundi18h: '',
        lundi19h: '',
        mardi8h: '',
        mardi9h: '',
        mardi10h: '',
        mardi11h: '',
        mardi12h: '',
        mardi13h: '',
        mardi14h: '',
        mardi15h: '',
        mardi16h: '',
        mardi17h: '',
        mardi18h: '',
        mardi19h: '',
        mercredi8h: '',
        mercredi9h: '',
        mercredi10h: '',
        mercredi11h: '',
        mercredi12h: '',
        mercredi13h: '',
        mercredi14h: '',
        mercredi15h: '',
        mercredi16h: '',
        mercredi17h: '',
        mercredi18h: '',
        mercredi19h: '',
        jeudi8h: '',
        jeudi9h: '',
        jeudi10h: '',
        jeudi11h: '',
        jeudi12h: '',
        jeudi13h: '',
        jeudi14h: '',
        jeudi15h: '',
        jeudi16h: '',
        jeudi17h: '',
        jeudi18h: '',
        jeudi19h: '',
        vendredi8h: '',
        vendredi9h: '',
        vendredi10h: '',
        vendredi11h: '',
        vendredi12h: '',
        vendredi13h: '',
        vendredi14h: '',
        vendredi15h: '',
        vendredi16h: '',
        vendredi17h: '',
        vendredi18h: '',
        vendredi19h: ''
    };

    constructor(
        private route: ActivatedRoute,
        private planningService: CalendrierService,
        private coursService: CoursService,
        private classRoomService: ClasseService
    ) {}

    ngOnInit(): void {
        this.getAllPlannings();
        this.getAllCourses();
        this.getAllClassRooms();
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
    // ----------------- get All ClassRooms-------------
    getAllClassRooms(){
        this.classRoomService.getAllClassRooms().subscribe(
            (classRooms) => {
                this.classRoomData = classRooms;
            },
            (error) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
    // Récupère tous les plannings
    getAllPlannings() {
        this.planningService.getAllPlannings().subscribe(
            (Plannings) => {
                this.PlanningData = Plannings;
                this.groupByClass();
            },
            (error) => {
                console.error(error);
            }
        );
    }
    // --------------------- Regrouper les plannings par classe -------------------------
    groupByClass() {
        this.GroupedPlannings = this.PlanningData.reduce((acc: any, planning: any) => {
            acc[planning.className] = acc[planning.className] || [];
            acc[planning.className].push(planning);
            return acc;
        }, {});

        // Récupérer les noms de classes
        this.classesList = Object.keys(this.GroupedPlannings);
    }
    // -----------------------------------

    // Affiche les plannings pour une classe sélectionnée
    selectClass(className: string) {
        this.selectedClass = className;
        this.currentPage = 1; // Réinitialiser la page
        this.updateDisplayedPlannings();
    }

    // Met à jour les plannings affichés en fonction de la pagination
    updateDisplayedPlannings() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedPlannings = this.GroupedPlannings[this.selectedClass!].slice(startIndex, endIndex);
    }

    // Change la page
    changePage(page: number) {
        this.currentPage = page;
        this.updateDisplayedPlannings();
    }
    //-------------------- Fonction Pop up de visualisation des infos d'un planning ---------------
    openPlanningDetailsPopUp(){
        this.isPlanningDetailPopupOpen = true;
    }
    ClosePlanningDetailsPopUp(){
        this.isPlanningDetailPopupOpen = false;
    }
    //------------------Selected planning-------------------------------------------------------------------------
    selectPlanning(planning: any): void {
        this.selectedPlanning = planning;
        this.openPlanningDetailsPopUp();
    }
    //------------------Selected planning-------------------------------------------------------------------------
    selectPlanningToUpdate(planning: any): void {
        this.selectedPlanning = planning;
        this.openUpdatePlanningPopup();
    }
    // --------------------------------------------------------------------
    // Update planning Method
    Updateplanning(){
        this.updatedPlanningDto.id = this.selectedPlanning.id; // L'id du planning que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
        this.planningService.UpdatePlanning(this.selectedPlanning.id,this.updatedPlanningDto).subscribe(
            (response) => {
                // Gérez la réponse de l'API ici
                console.log(response);
                // fermeture du popup Après le traitement
                this.closeUpdatePlanningPopup();
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
    // -------------
    // -------------Up date classRoom Pop Up -----------------------------------------------
    openUpdatePlanningPopup() {
        this.isUpdatePlanningPopUpOpen = true;
    }
    closeUpdatePlanningPopup() {
        this.isUpdatePlanningPopUpOpen = false;
    }
    //------------------Selected planning-------------------------------------------------------------------------
    selectPlanningToDownload(planning: any): void {
        this.selectedPlanning = planning;
        this.openPlanningDetailsPopUp();
        // Attendre que le DOM soit mis à jour, puis générer le PDF
        setTimeout(() => {
            this.downloadPlanningAsPDF();
        }, 400);
        setTimeout(() => {
            this.ClosePlanningDetailsPopUp();// après le téléchargement je ferme le PopUp
        }, 400);
    }
    // ------------------ Fonction pour télécharger le planning en PDF
    downloadPlanningAsPDF() {
        const element = document.getElementById('planning-content'); // ID du conteneur du planning

        if (element) {
            html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
                const imageData = canvas.toDataURL('image/png'); // Convertit l'élément HTML en image
                const pdf = new jsPDF('p', 'mm', 'a4'); // Format PDF (portrait, millimètres, A4)

                // Dimensions de la page PDF
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                // Dimensions de l'image capturée
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                // Calcul de l'échelle pour ajuster le contenu à la page PDF
                const widthScale = pdfWidth / canvasWidth;
                const heightScale = pdfHeight / canvasHeight;
                const scale = Math.min(widthScale, heightScale); // Prendre le plus petit facteur pour que tout tienne

                // Dimensions ajustées pour le PDF
                const adjustedWidth = canvasWidth * scale;
                const adjustedHeight = canvasHeight * scale;

                // Centrer l'image sur la page PDF
                const offsetX = (pdfWidth - adjustedWidth) / 2;
                const offsetY = (pdfHeight - adjustedHeight) / 2;

                // Ajouter l'image redimensionnée au PDF
                pdf.addImage(imageData, 'PNG', offsetX, offsetY, adjustedWidth, adjustedHeight);
                pdf.save(this.selectedPlanning.className+'_planning_du_'+this.selectedPlanning.semaineDu
                    +'_au_'+this.selectedPlanning.semaineAu+'.pdf'); // Télécharge le fichier PDF
            });
        } else {
            console.error('Élément planning non trouvé !');
        }
    }
    //---------------------
    // ----------------------- Selected ClassRoom To Delete --------------------------------
    selectPlanningToDelete(planning:any): void{
        this.selectedPlanning = planning;
        alert("Le planning selectionné sera supprimé");
        this.DeletePlanning();
        // Je recharge la page
        window.location.reload();
    }
    // Delete Planning, NB: Cette methode est appelée un peu plus haut, pas duppliquée
    DeletePlanning(){
        this.planningService.DeletePlanning(this.selectedPlanning.id).subscribe(
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
    // ----------------------------------- Fin ----------------------------------
}
