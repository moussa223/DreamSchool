import { Component, OnInit } from '@angular/core';
import{InscriptionService} from "./inscription.service";
import {Router} from "@angular/router";
import {timer} from "rxjs";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
    inscriptionReussie = false; //Si true la notification success s'affichera
    loaded: boolean = false;

    constructor(public inscriptionService: InscriptionService, private router:Router) { }//Injectez le service dans le constructeur

  ngOnInit(): void {
  }
  register(){
      if (Object.values(this.inscriptionService.model).some(value => value === '')) {
          alert("Veuillez remplir tous les champs !");
          return;
      }
      else if (this.inscriptionService.model.password !== this.inscriptionService.confirmPassword)
      {
          // Les mots de passe ne correspondent pas, affichez un message d'erreur ou prenez une autre mesure appropriée.
          alert("Les mots de passe ne correspondent pas !");
          return;
      }
      else{
          this.inscriptionService.registerUser().subscribe(
              (response) => {
                  // Gérez la réponse de l'API ici
                  console.log(response);
                  //alert("Inscription reussi !");
                  this.inscriptionReussie = true;
                  timer(5000).subscribe(() => {
                      // Cachez la notification après 5 secondes
                      this.inscriptionReussie = false;

                      // Utilisez window.history.replaceState() pour effacer les données du formulaire de l'historique de navigation
                      this.inscriptionService.model = {};
                      this.inscriptionService.confirmPassword = "";
                      const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
                      window.history.replaceState({}, document.title, newUrl);


                      // Redirigez vers la page de connexion ou le composant après une inscription réussie
                      this.router.navigate(['/']); // Remplacez 'connexion' par le chemin de votre page de connexion ou du composant
                  });
                  // Redirigez vers la page de connexion ou le composant après une inscription réussie
                  //this.router.navigate(['/']); // Remplacez 'connexion' par le chemin de votre page de connexion ou du composant

              },
              (error) => {
                  // Gérez les erreurs ici
                  // console.error(error.error.message);
                  console.error(error);
                  alert(error.error.message);
              }
          );
      }
  }
}
