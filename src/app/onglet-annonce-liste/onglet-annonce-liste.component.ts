import { Component, OnInit } from '@angular/core';
import {AnnonceService} from "../annonce/annonce.service";
import {EleveService} from "../eleve/eleve.service";
import {ProfesseurService} from "../onglet-liste-professeur/professeur.service";

@Component({
  selector: 'app-onglet-annonce-liste',
  templateUrl: './onglet-annonce-liste.component.html',
  styleUrls: ['./onglet-annonce-liste.component.css']
})
export class OngletAnnonceListeComponent implements OnInit {
  messageData: any; // Contient les infos de touts les messages de la Base de données
  studentsData: any;
  teacherData: any;
  isPopupOpen = false; // Le pop up d'ajout du message est par défaut fermé
  isMessagePopUpOpen = false;
  selectedMessage: any | null = null;  // Le message selectionné parmi la liste des classes
  // Propriété temporaire pour gérer la sélection multiple
  selectedDestinataires: string[] = [];

  constructor(public messageService:AnnonceService,
              public eleveService:EleveService,
              public professeurService:ProfesseurService) { }

  ngOnInit(): void {
    this.getAllMessages();
  }
  // --------------------- Get All Students ---------------------------------
  getAllStudents(){
    this.eleveService.getAllStudents().subscribe(
        (students) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(students);
          this.studentsData = students;
          //console.log(this.studentsData[0].lastName);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ------------------- Get All Teachers --------------------------------------------
  getAllTeachers(){
    this.professeurService.getAllTeachers().subscribe(
        (teachers) => {
          // Vous pouvez utiliser les données des étudiants ici
          console.log(teachers);
          this.teacherData = teachers;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
//-------------Fontion utilisée pour l'ouverture et la fermeture du pop up d'ajout d'un message  ------------
  openPopup() {
    this.isPopupOpen = true;
  }
  closePopup() {
    this.isPopupOpen = false;
  }
  // ----------------- get All Messages-------------
  getAllMessages(){
    this.messageService.getAllMessages().subscribe(
        (messages) => {
          // Vous pouvez utiliser les données des étudiants ici
          // console.log(messages);
          this.messageData = messages;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  //-------------------- Fonction Pop up de visualisation des infos d'un message ---------------
  openMessageDetailsPopUp(){
    this.isMessagePopUpOpen = true;
  }
  CloseMessageDetailsPopUp(){
    this.isMessagePopUpOpen = false;
  }
//------------------Selected Class-------------------------------------------------------------------------
  selectMessage(message: any): void {
    this.selectedMessage = message;
    this.openMessageDetailsPopUp();
  }
  // ----------------------- Selected Message To Delete ---------------------------
  selectMessageToDelete(message:any): void{
    this.selectedMessage = message;
    alert("Le message "+this.selectedMessage.titre + " sera supprimé");
    this.DeleteMessage();
    // Je recharge la page
    window.location.reload();
  }
// ------------------------------------------------------------------------------
// Delete Message, NB: Cette methode est appelée un peu plus haut, pas duppliquée
  DeleteMessage(){
    this.messageService.DeleteMessage(this.selectedMessage.id).subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          console.log(response);
          // fermeture du popup Après le traitement
          this.closePopup();
          // Rechargez la page après une réponse réussie
          // window.location.reload(); // Je l'ai mis en commentaire car avec delete la requête rentre dans le
          // case Error je ne sais pas pourquoi mais je vais recharger la page en haut dans DeleteClass
        },
        (error) => {
          // Gérez les erreurs ici
          // console.error(error.error.message);
          console.error(error);
        }
    );
  }
// -------------------------------------------------------------------
  // Création d'une classe
  onSubmit() {
    this.CreateMessage();
    // Logique pour traiter les données du formulaire ici
    // fermeture du popup Après le traitement
    this.closePopup();
    // Rechargez la page après une réponse réussie
    window.location.reload();
  }
// ------------------------- Create Message -------------------------
  CreateMessage(){
    this.messageService.CreateMessage().subscribe(
        (response) => {
          // Gérez la réponse de l'API ici
          console.log(response);
        },
        (error) => {
          // Gérez les erreurs ici
          // console.error(error.error.message);
          console.error(error);
        }
    );
  }
// -------------------------------------------------------------------
  // Fonction qui transforme le tableau en string
  updateDestinatairesString(): void {
    this.messageService.messageModel.messageDto.destinataire = this.selectedDestinataires.join(', ');
  }

  // ---------------------------------------------------------------

    sendMessage() {
        if (!this.selectedMessage) {
            alert('Veuillez sélectionner un message à envoyer.');
            return;
        }

        // Vérifie que les champs obligatoires sont remplis
        const requiredFields = ['titre', 'categorie', 'dateAjout', 'contenu', 'destinataire'];
        for (const field of requiredFields) {
            if (!this.selectedMessage[field] || this.selectedMessage[field].trim() === '') {
                alert(`Le champ ${field} est requis. Merci de le remplir avant d’envoyer le message.`);
                return;
            }
        }

        // Cas spécial : destinataire = élèves
        if (this.selectedMessage.destinataire.toLowerCase() === 'élèves') {
            this.eleveService.getAllStudents().subscribe(
                (students: any[]) => {
                    const emails = students.map(s => s.email).filter(e => e); // On récupère tous les emails valides

                    if (emails.length === 0) {
                        alert('Aucun email d’élève trouvé.');
                        return;
                    }

                    // On modifie directement selectedMessage pour inclure tous les emails
                    const messageToSend = {
                        ...this.selectedMessage,
                        destinataire: emails.join(',')  // On met tous les emails séparés par virgule
                    };

                    // Envoi direct de l'objet (pas de messageModel, pas de messageDto)
                    this.messageService.SendMessage(messageToSend).subscribe(
                        (response) => {
                            console.log('Message envoyé avec succès :', response);
                            alert('Le message a été envoyé à tous les élèves.');
                        },
                        (error) => {
                            console.error('Erreur lors de l\'envoi du message :', error);
                            alert('Une erreur est survenue lors de l\'envoi du message.');
                        }
                    );
                },
                (error) => {
                    console.error('Erreur lors de la récupération des élèves :', error);
                    alert('Impossible de récupérer la liste des élèves.');
                }
            );
        }
        else if (this.selectedMessage.destinataire.toLowerCase() === 'enseignants') {
            // Envoyer uniquement aux professeurs
            this.professeurService.getAllTeachers().subscribe(
                (teachers: any[]) => {
                    const emails = teachers.map(p => p.email).filter(e => e);

                    if (emails.length === 0) {
                        alert('Aucun email de professeur trouvé.');
                        return;
                    }

                    const messageToSend = {
                        ...this.selectedMessage,
                        destinataire: emails.join(',')
                    };

                    // Envoi direct de l'objet (pas de messageModel, pas de messageDto)
                    this.messageService.SendMessage(messageToSend).subscribe(
                        (response) => {
                            console.log('Message envoyé avec succès :', response);
                            alert('Le message a été envoyé à tous les professeurs.');
                        },
                        (error) => {
                            console.error('Erreur lors de l\'envoi du message :', error);
                            alert('Une erreur est survenue lors de l\'envoi du message.');
                        }
                    );
                },
                (error) => {
                    console.error('Erreur lors de la récupération des professeurs :', error);
                    alert('Impossible de récupérer la liste des professeurs.');
                }
            );
        }
        else if (this.selectedMessage.destinataire.toLowerCase() === 'élèves, enseignants'
            || this.selectedMessage.destinataire.toLowerCase() === 'enseignants, élèves') {
            // Envoyer aux deux : élèves + professeurs
            this.eleveService.getAllStudents().subscribe(
                (students: any[]) => {
                    const studentEmails = students.map(s => s.email).filter(e => e);

                    this.professeurService.getAllTeachers().subscribe(
                        (teachers: any[]) => {
                            const teacherEmails = teachers.map(p => p.email).filter(e => e);

                            const allEmails = [...studentEmails, ...teacherEmails];

                            if (allEmails.length === 0) {
                                alert('Aucun email d’élève ou de professeur trouvé.');
                                return;
                            }

                            const messageToSend = {
                                ...this.selectedMessage,
                                destinataire: allEmails.join(',')
                            };

                            // Envoi direct de l'objet (pas de messageModel, pas de messageDto)
                            this.messageService.SendMessage(messageToSend).subscribe(
                                (response) => {
                                    console.log('Message envoyé avec succès :', response);
                                    alert('Le message a été envoyé à tous les élèves et professeurs.');
                                },
                                (error) => {
                                    console.error('Erreur lors de l\'envoi du message :', error);
                                    alert('Une erreur est survenue lors de l\'envoi du message.');
                                }
                            );
                        },
                        (error) => {
                            console.error('Erreur lors de la récupération des professeurs :', error);
                            alert('Impossible de récupérer la liste des professeurs.');
                        }
                    );
                },
                (error) => {
                    console.error('Erreur lors de la récupération des élèves :', error);
                    alert('Impossible de récupérer la liste des élèves.');
                }
            );
        }

        else {
            // Cas normal : destinataire est un email unique
            const messageToSend = { ...this.selectedMessage };

            this.messageService.SendMessage(messageToSend).subscribe(
                (response) => {
                    console.log('Message envoyé avec succès :', response);
                    alert('Le message a été envoyé avec succès.');
                },
                (error) => {
                    console.error('Erreur lors de l\'envoi du message :', error);
                    alert('Une erreur est survenue lors de l\'envoi du message.');
                }
            );
        }
    }


}
