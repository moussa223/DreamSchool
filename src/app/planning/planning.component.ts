import { Component, ElementRef, ViewChild } from '@angular/core';
import { PlanningService } from './planning.service'; // Adjust the import path
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {CoursService} from "../cours/cours.service";
import {Router} from "@angular/router";
import {ClasseService} from "../classe/classe.service";


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent {


  courseData: any; // Contient les infos de tous les cours de la base de données
  classRoomData: any; // Contient les infos de toutes les classes de la base de données
  constructor(public planningService: PlanningService,private coursService: CoursService,private router:Router,private classRoomService: ClasseService) { }

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllClassRooms();
  }

  // ---------------------------------------------

  // ----------------------Get All Courses --------------------------
  getAllCourses(){
    this.coursService.getAllCourses().subscribe(
        (courses) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(courses);
          this.courseData = courses;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------- get All ClassRooms-------------
  getAllClassRooms(){
    this.classRoomService.getAllClassRooms().subscribe(
        (classRooms) => {
          this.classRoomData = classRooms;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ---------------- Create Planning ------------------------------
  CreatePlanning(){
    this.planningService.CreatePlanning().subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          console.log(response);
          // Recharger la page après une réponse réussie
          window.location.reload();
        },
        (error) => {
          // Gérez les erreurs ici
          // console.error(error.error.message);
          console.error(error);
        }
    );
  }
  // -----------------------------------------------------




}
