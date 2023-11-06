import { Component, OnInit } from '@angular/core';
import {ClasseService} from "./classe.service";

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  test:any;
  classRoomData: any;
  isPopupOpen = false; // le pop up d'ajout de classe est par défaut fermé
  constructor(private classeService:ClasseService) { }

  ngOnInit(): void {
    this.getAllClassRooms();
  }
  getAllClassRooms(){
    this.classeService.getAllClassRooms().subscribe(
        (classRooms) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(classRooms);
          this.classRoomData = classRooms;
          console.log(this.classRoomData[0].name);
          this.test = this.classRoomData[0].levels + " " + this.classRoomData[0].name;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
    //-------------------------
    openPopup() {
        this.isPopupOpen = true;
    }

    closePopup() {
        this.isPopupOpen = false;
    }
    onSubmit() {
        // Logique pour traiter les données du formulaire ici
        // Après traitement, vous pouvez fermer le popup
        this.closePopup();
    }

}
