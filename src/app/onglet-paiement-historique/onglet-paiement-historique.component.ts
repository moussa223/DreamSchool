import { Component, OnInit } from '@angular/core';
import {PaiementService} from "../paiement/paiement.service";

@Component({
  selector: 'app-onglet-paiement-historique',
  templateUrl: './onglet-paiement-historique.component.html',
  styleUrls: ['./onglet-paiement-historique.component.css']
})
export class OngletPaiementHistoriqueComponent implements OnInit {
  paiementData: any; // Contiendra toutes les données de toutes les paiementes de la BDD
  constructor(public paiementService:PaiementService) { }
  selectedPaiement: any | null = null;  // Le paiement selectionné parmi la liste des paiements

  ngOnInit(): void {
    this.getAllPaiements();
  }
  // ----------------------------------------------------------------------------------------
  getAllPaiements(){
    this.paiementService.getAllPaiements().subscribe(
        (paiements) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.paiementData = paiements;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------- Selected Paiement To Delete --------------------------------
  selectPaiementToDelete(paiement:any): void{
    this.selectedPaiement = paiement;
    alert("Le paiement selectionné sera supprimé");
    this.DeletePaiement();
    // Je recharge la page
    window.location.reload();
  }

// Delete Paiement, NB: Cette methode est appelée un peu plus haut, pas duppliquée
  DeletePaiement(){
    this.paiementService.DeletePaiement(this.selectedPaiement.id).subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          console.log(response);
          // fermeture du popup Après le traitement
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

}
