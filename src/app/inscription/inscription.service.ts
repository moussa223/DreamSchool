import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  model: any = {
    lastName: '',
    firstName: '',
    gender:'',
    birthDate:'',
    userName:'',
    email:'',
    address:'',
    phoneNumber:'',
    password: ''
  };
  confirmPassword: '';
  private apiRegisterUrl = 'https://localhost:7012/api/AuthContoller/Register'; //  l'URL de l' API

  constructor(private http: HttpClient) { }

  registerUser() {
    //  appel POST vers la route "register" de l' API
    return this.http.post(this.apiRegisterUrl, this.model);
  }


}
