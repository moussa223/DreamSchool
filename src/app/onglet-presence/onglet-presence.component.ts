import { Component, OnInit } from '@angular/core';
import {ClasseService} from "../classe/classe.service";
import {CoursService} from "../cours/cours.service";
import {EleveService} from "../eleve/eleve.service";
import {PresenceService} from "../presence/presence.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-onglet-presence',
  templateUrl: './onglet-presence.component.html',
  styleUrls: ['./onglet-presence.component.css']
})
export class OngletPresenceComponent implements OnInit {
  PresenceData: any; // Contiendra les donnéees de toutes les présences de la bdd
    classRoomData: any;
    GroupedPresences: any = {}; // Plannings regroupés par classe
    classesList: string[] = []; // Liste des classes
    selectedClass: string | null = null; // Classe sélectionnée
    selectedPresence: any | null = null;  // Le planning selectionné parmi la liste des plannings d'une classe
    displayedPresences: any[] = []; // Plannings affichés pour une classe
    currentPage: number = 1; // Page actuelle
    itemsPerPage: number = 5; // Nombre d'éléments par page


  constructor(public classRoomService:ClasseService, private coursService: CoursService,public eleveService:EleveService,
              public presenceService:PresenceService,private router:Router) { }

  ngOnInit(): void {
    this.getAllPresences();
    this.getAllClassRooms();
  }

  // ----------------- get All Presences-------------------------------------------------------------------------------
  getAllPresences(){
    this.presenceService.getAllPresences().subscribe(
        (Presences) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(Presences);
          this.PresenceData = Presences;
            this.groupByClass();
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ---------------------------------------------------
    toggleText(presence: any) {
        presence.showText = !presence.showText;
    }
    // ------------------------------------------
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
    // ------------------------------------------------
    // --------------------- Regrouper les presences par classe -------------------------
    groupByClass() {
        this.GroupedPresences = this.PresenceData.reduce((acc: any, presence: any) => {
            acc[presence.autres] = acc[presence.autres] || [];
            acc[presence.autres].push(presence);
            return acc;
        }, {});

        // Récupérer les noms de classes
        this.classesList = Object.keys(this.GroupedPresences);
    }
    // -----------------------------------

    // Affiche les presences pour une classe sélectionnée
    selectClass(className: string) {
        this.selectedClass = className;
        this.currentPage = 1; // Réinitialiser la page
        this.updateDisplayedPresences();
    }

    // Met à jour les presences affichés en fonction de la pagination
    updateDisplayedPresences() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedPresences = this.GroupedPresences[this.selectedClass!].slice(startIndex, endIndex);
    }

    // Change la page
    changePage(page: number) {
        this.currentPage = page;
        this.updateDisplayedPresences();
    }
    // ----------------------------------------
    // ----------------------- Selected Presence To Delete --------------------------------
    selectPresenceToDelete(presence:any): void{
        this.selectedPresence = presence;
        alert("La presence selectionnée sera supprimée");
        this.DeletePresence();
        // Je recharge la page
        window.location.reload();
    }
    // Delete Presence, NB: Cette methode est appelée un peu plus haut, pas duppliquée
    DeletePresence(){
        this.presenceService.DeletePresence(this.selectedPresence.id).subscribe(
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
