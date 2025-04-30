import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { SidebareComponent } from './sidebare/sidebare.component';
import { TableauBordComponent } from './tableau-bord/tableau-bord.component';
import { ClasseComponent } from './classe/classe.component';
import { EleveComponent } from './eleve/eleve.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { OngletListeEleveComponent } from './onglet-liste-eleve/onglet-liste-eleve.component';
import { FamilleComponent } from './famille/famille.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { OngletListeProfesseurComponent } from './onglet-liste-professeur/onglet-liste-professeur.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PresenceComponent } from './presence/presence.component';
import { OngletListeFamilleComponent } from './onglet-liste-famille/onglet-liste-famille.component';
import { AdmissionComponent } from './admission/admission.component';
import { InscriptionSuccessNotificationComponent } from './inscription-success-notification/inscription-success-notification.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { CreateEleveComponent } from './create-eleve/create-eleve.component';
import { CoursComponent } from './cours/cours.component';
import { ClasseDetailsComponent } from './classe-details/classe-details.component';
import { OngletBulletinComponent } from './onglet-bulletin/onglet-bulletin.component';
import { OngletNotesComponent } from './onglet-notes/onglet-notes.component';
import { PlanningComponent } from './planning/planning.component';
import { OngletSeanceComponent } from './onglet-seance/onglet-seance.component';
import { OngletPresenceComponent } from './onglet-presence/onglet-presence.component';
import { PeriodSetupComponent } from './period-setup/period-setup.component';
import { PaiementComponent } from './paiement/paiement.component';
import { OngletPaiementDashboardComponent } from './onglet-paiement-dashboard/onglet-paiement-dashboard.component';
import { OngletPaiementHistoriqueComponent } from './onglet-paiement-historique/onglet-paiement-historique.component';
import { OngletPaiementAjoutComponent } from './onglet-paiement-ajout/onglet-paiement-ajout.component';
import { OngletPaiementRetardComponent } from './onglet-paiement-retard/onglet-paiement-retard.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SidebareComponent,
    TableauBordComponent,
    ClasseComponent,
    EleveComponent,
    ProfesseurComponent,
    OngletListeEleveComponent,
    FamilleComponent,
    CalendrierComponent,
    OngletListeProfesseurComponent,
    InscriptionComponent,
    PresenceComponent,
    OngletListeFamilleComponent,
    AdmissionComponent,
    InscriptionSuccessNotificationComponent,
    CreateClassComponent,
    CreateEleveComponent,
    CoursComponent,
    ClasseDetailsComponent,
    OngletBulletinComponent,
    OngletNotesComponent,
    PlanningComponent,
    OngletSeanceComponent,
    OngletPresenceComponent,
    PeriodSetupComponent,
    PaiementComponent,
    OngletPaiementDashboardComponent,
    OngletPaiementHistoriqueComponent,
    OngletPaiementAjoutComponent,
    OngletPaiementRetardComponent,


  ],
  providers: [],
  exports: [
    SidebareComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
