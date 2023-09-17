import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private tokenKey: 'usingsecretkeyforapp'; // même clé utilisée au niveau du back
  private apiLoginUrl = 'https://localhost:7012/api/AuthContoller/Login'; //  l'URL de l' API
    model: any = {
        loginDto: {
            userNameOrEmail: '',
            password: ''
        }
    };

    constructor(private http: HttpClient,private router:Router) {}

  login() {
    // Faites une requête à votre API pour obtenir le token
    return this.http.post(this.apiLoginUrl, this.model).subscribe(
        (response: any) => {
          // Si la requête réussit, enregistrez le token
            this.token = response.token; // Assurez-vous que la structure de la réponse correspond à votre API
            localStorage.setItem(this.tokenKey, response.token);
            alert("Connexion reussi");
            console.log(response)
            this.router.navigate(['/Classe']);
        },
        (error) => {
          // Gérez les erreurs de connexion ici
          console.error('Erreur de connexion', error,error.status, error.error);
          alert("Les identifiants Saisis sont incorrects");
        }
    );
  }

  // Vérifier si l'utilisateur est connecté ou pas,  si un token existe ou pas
  isLoggedIn(): boolean {
      // Vérifiez si le token existe dans le localStorage pour déterminer si l'utilisateur est connecté
      const token = localStorage.getItem(this.tokenKey);
      return token !== null;
  }
  // gestion de la deconnexion
    logout(): void {
        // Vous pouvez ici effectuer la logique de déconnexion
        // Par exemple, effacer le token
        this.token = null;
    }
}
