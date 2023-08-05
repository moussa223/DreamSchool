import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from "./login/login.component";
import {SidebareComponent} from "./sidebare/sidebare.component";
import {TableauBordComponent} from "./tableau-bord/tableau-bord.component";
import{ClasseComponent} from "./classe/classe.component";
import{EleveComponent} from "./eleve/eleve.component";
import {ProfesseurComponent} from "./professeur/professeur.component";
import{FamilleComponent} from "./famille/famille.component";
import{CalendrierComponent} from "./calendrier/calendrier.component";

const routes: Routes =[
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'Admin',
    component: AdminLayoutComponent,
  },
  {
    path: 'Sidebare',
    component: SidebareComponent,
  },
  {
    path: 'Tableau',
    component: TableauBordComponent,
  },
  {
    path: 'Classe',
    component: ClasseComponent,
  },
  {
    path: 'Eleve',
    component: EleveComponent,
  },
  {
    path: 'Professeur',
    component: ProfesseurComponent,
  },
  {
    path: 'Famille',
    component: FamilleComponent,
  },
  {
    path: 'Calendrier',
    component: CalendrierComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
