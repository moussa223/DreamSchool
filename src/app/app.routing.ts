import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {SidebareComponent} from "./sidebare/sidebare.component";
import {TableauBordComponent} from "./tableau-bord/tableau-bord.component";

const routes: Routes =[
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
  },
  {
    path: 'Admin',
    component: AdminLayoutComponent,
  },
  {
    path: 'Sidebar',
    component: SidebarComponent,
  },
  {
    path: 'Sidebare',
    component: SidebareComponent,
  },
  {
    path: 'Tableau',
    component: TableauBordComponent,
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
