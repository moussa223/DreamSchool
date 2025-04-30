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
import {InscriptionComponent} from "./inscription/inscription.component";
import {PresenceComponent} from "./presence/presence.component";
import {AdmissionComponent} from "./admission/admission.component";
import {AuthGuard} from "./auth.guard";
import {CoursComponent} from "./cours/cours.component";
import {PlanningComponent} from "./planning/planning.component";
import {PeriodSetupComponent} from "./period-setup/period-setup.component";
import {PaiementComponent} from "./paiement/paiement.component";

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
    canActivate: [AuthGuard]
  },
  {
    path: 'Tableau',
    component: TableauBordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Classe',
    component: ClasseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Eleve',
    component: EleveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Professeur',
    component: ProfesseurComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Famille',
    component: FamilleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Calendrier',
    component: CalendrierComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Planning',
    component: PlanningComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'Inscription',
    component: InscriptionComponent,
  },
  {
    path: 'Presence',
    component: PresenceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Admission',
    component: AdmissionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Cours',
    component: CoursComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Period',
    component: PeriodSetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Paiement',
    component: PaiementComponent,
    canActivate: [AuthGuard]
  }
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
