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


  ],
  providers: [],
  exports: [
    SidebareComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
