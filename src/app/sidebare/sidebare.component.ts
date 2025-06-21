import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-sidebare',
  templateUrl: './sidebare.component.html',
  styleUrls: ['./sidebare.component.css']
})
export class SidebareComponent implements OnInit {
  userData: any; // Créez une variable pour stocker les données de l'utilisateur

  constructor(public authservice:AuthService) { }

  ngOnInit(): void {

    // Vérifier si le token existe

    const token = localStorage.getItem('usingsecretkeyforapp');
    const jwtHelper = new JwtHelperService();
    // Décodez le token
    this.userData = jwtHelper.decodeToken(token);
    // console.log("l email du user est: "+this.userData.email);
    // console.log("Le nom du user est: "+this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]); // Affiche le nom de l'utilisateur
  }


}
