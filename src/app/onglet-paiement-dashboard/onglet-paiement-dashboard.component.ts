import { Component, OnInit } from '@angular/core';
import {PaiementService} from "../paiement/paiement.service";
import {ClasseService} from "../classe/classe.service";
import {EleveService} from "../eleve/eleve.service";
import {PeriodSetupService} from "../period-setup/period-setup.service";

@Component({
  selector: 'app-onglet-paiement-dashboard',
  templateUrl: './onglet-paiement-dashboard.component.html',
  styleUrls: ['./onglet-paiement-dashboard.component.css']
})
export class OngletPaiementDashboardComponent implements OnInit {
  classRoomData: any; // Contient les infos de toutes les classes de la Base de données
  studentData: any; // Contiendra toutes les données de tous les élèves
  paiementData: any; // Contiendra toutes les données de toutes les paiementes de la BDD
  periodData: any; // Contiendra toutes les données de toutes les periodes de la BDD
    totalMontantPaye: any;
  // ----------------------------------------------------------------------------------------
  constructor(public paiementService:PaiementService,public classeService:ClasseService
      ,public eleveService:EleveService,public periodService:PeriodSetupService) { }
  // Fonction pour changer l'onglet actif

  // ----------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.getAllClassRooms();
    this.getAllStudents();
    this.getAllPeriods();
    this.getAllPaiements();
  }
  // ----------------------------------------------------------------------------------------
  getAllClassRooms(){
    this.classeService.getAllClassRooms().subscribe(
        (classRooms) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.classRoomData = classRooms;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------------------------------------------------------------------------
  getAllStudents(){
    this.eleveService.getAllStudents().subscribe(
        (students) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.studentData = students;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------------------------------------------------------------------------
  getAllPeriods(){
    this.periodService.getAllPeriods().subscribe(
        (periods) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.periodData = periods;
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------
  getAllPaiements(){
    this.paiementService.getAllPaiements().subscribe(
        (paiements) => {
          // Vous pouvez utiliser les données des étudiants ici
          this.paiementData = paiements;
            // Conversion sécurisée de string vers number, et calcul de la somme
            this.totalMontantPaye = this.paiementData.reduce((total, paiement) => {
                const montant = parseFloat(paiement.montantPaye?.toString().replace(/\s/g, '').replace(',', '.')) || 0;
                return total + montant;
            }, 0);
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
        }
    );
  }
  // ----------------------------------------------------------------------------------------
    getTotalRestantDuPeriode(periode: any): number {
        const classeNom = periode.className;
        const montantAnnuel = parseFloat(
            periode.montantAnnuel?.toString().replace(/\s/g, '').replace(',', '.')
        ) || 0;

        if (!this.studentData || !this.paiementData) return 0;

        // Filtrer les élèves appartenant à cette classe
        const elevesClasse = this.studentData.filter(eleve =>
            eleve.classRooms &&
            eleve.classRooms.length > 0 &&
            eleve.classRooms[0].name === classeNom
        );

        // Liste des noms complets des élèves de cette classe
        const nomsElevesClasse = elevesClasse.map(e =>
            (e.lastName + ' ' + e.firstName).trim().toLowerCase()
        );

        // Paiements de type "frais de scolarité" correspondant à ces noms
        const paiementsClasse = this.paiementData.filter(paiement =>
            paiement.typeDeFrais?.toLowerCase() === 'scolarité' &&
            nomsElevesClasse.includes(paiement.nomEleve?.trim().toLowerCase())
        );

        // Somme des paiements reçus
        const totalPaye = paiementsClasse.reduce((total: number, paiement: any) => {
            const montant = parseFloat(
                paiement.montantPaye?.toString().replace(/\s/g, '').replace(',', '.')
            ) || 0;
            return total + montant;
        }, 0);

        const totalAttendu = elevesClasse.length * montantAnnuel;
        return totalAttendu - totalPaye;
    }
    // --------------------------------------------------------------------------
    getElevesEnRetardParPeriode(periode: any): any[] {
        const classeNom = periode.className;
        const montantAnnuel = parseFloat(
            periode.montantAnnuel?.toString().replace(/\s/g, '').replace(',', '.')
        ) || 0;

        if (!this.studentData || !this.paiementData) return [];

        const elevesClasse = this.studentData.filter(eleve =>
            eleve.classRooms &&
            eleve.classRooms.length > 0 &&
            eleve.classRooms[0].name === classeNom
        );

        // Filtrer les élèves en retard
        return elevesClasse.map(eleve => {
            const nomComplet = (eleve.lastName + ' ' + eleve.firstName).trim().toLowerCase();

            // Paiements de type "scolarité" pour cet élève
            const paiements = this.paiementData.filter(paiement =>
                paiement.typeDeFrais?.toLowerCase() === 'scolarité' &&
                paiement.nomEleve?.trim().toLowerCase() === nomComplet
            );

            // Calculer le total des paiements de cet élève
            const totalPaye = paiements.reduce((total: number, paiement: any) => {
                const montant = parseFloat(
                    paiement.montantPaye?.toString().replace(/\s/g, '').replace(',', '.')
                ) || 0;
                return total + montant;
            }, 0);

            // Calcul du montant restant dû
            const montantRestant = montantAnnuel - totalPaye;

            // Retourner l'élève et le montant restant dû si l'élève a un solde restant
            return montantRestant > 0 ? { ...eleve, montantRestant } : null;
        }).filter(eleve => eleve !== null); // Filtrer pour ne garder que les élèves avec un solde restant dû
    }
    // -----------------------------------------------------------------------------
    getTotalRestantGlobal(): number {
        return this.periodData.reduce((total: number, periode: any) => {
            return total + this.getTotalRestantDuPeriode(periode);
        }, 0);
    }
    // ------------------------------------------------------------------------------

    getElevesEnRetardDetailsParTrimestre(periode: any): { trimestre: string, eleves: any[] }[] {
        const aujourdHui = new Date();
        const classeNom = periode.className;
        const montantAnnuel = parseFloat(periode.montantAnnuel?.toString().replace(/\s/g, '').replace(',', '.')) || 0;
        const montantTrimestriel = montantAnnuel / 3;

        if (!this.studentData || !this.paiementData) return [];

        const elevesClasse = this.studentData.filter(eleve =>
            eleve.classRooms &&
            eleve.classRooms.length > 0 &&
            eleve.classRooms[0].name === classeNom
        );

        const trimestres = [
            { libelle: 'Trimestre 1', dateLimite: new Date(periode.dateLimiteTrimestre1) },
            { libelle: 'Trimestre 2', dateLimite: new Date(periode.dateLimiteTrimestre2) },
            { libelle: 'Trimestre 3', dateLimite: new Date(periode.dateLimiteTrimestre3) },
        ];

        const resultats: { trimestre: string, eleves: any[] }[] = [];

        for (const trimestre of trimestres) {
            if (aujourdHui > trimestre.dateLimite) {
                const elevesEnRetard = [];

                for (const eleve of elevesClasse) {
                    const nomComplet = (eleve.lastName + ' ' + eleve.firstName).trim().toLowerCase();

                    // Paiements "scolarité" pour cet élève (tous paiements, pas juste avant la date limite)
                    const paiements = this.paiementData.filter(p =>
                        p.typeDeFrais?.toLowerCase() === 'scolarité' &&
                        p.nomEleve?.trim().toLowerCase() === nomComplet
                    );

                    // Somme totale des paiements (on va l'imputer trimestre par trimestre)
                    let totalPaye = paiements.reduce((somme: number, paiement: any) => {
                        const montant = parseFloat(paiement.montantPaye?.toString().replace(/\s/g, '').replace(',', '.')) || 0;
                        return somme + montant;
                    }, 0);

                    // On simule l’imputation : on déduit successivement sur chaque trimestre
                    let restantsParTrimestre = [montantTrimestriel, montantTrimestriel, montantTrimestriel]; // T1, T2, T3

                    for (let i = 0; i < 3; i++) {
                        const aPayer = restantsParTrimestre[i];

                        if (totalPaye >= aPayer) {
                            // Paiement couvre entièrement ce trimestre
                            restantsParTrimestre[i] = 0;
                            totalPaye -= aPayer;
                        } else {
                            // Paiement partiellement ou pas du tout → on déduit ce qu’on peut
                            restantsParTrimestre[i] -= totalPaye;
                            totalPaye = 0;
                        }
                    }

                    const indexTrimestre = trimestres.indexOf(trimestre);
                    const montantRestantCeTrimestre = restantsParTrimestre[indexTrimestre];

                    // Si il reste quelque chose à payer sur ce trimestre → en retard
                    if (montantRestantCeTrimestre > 0) {
                        elevesEnRetard.push({
                            nom: eleve.lastName + ' ' + eleve.firstName,
                            montantRestant: montantRestantCeTrimestre.toFixed(0)
                        });
                    }
                }

                resultats.push({ trimestre: trimestre.libelle, eleves: elevesEnRetard });
            }
        }

        return resultats;
    }

    // ---------------------------------------------------------------------------
    getNombreTotalElevesEnRetardParPeriode(periode: any): number {
        const retardsParTrimestre = this.getElevesEnRetardDetailsParTrimestre(periode);

        const uniqueEleves = new Set<string>();

        // Pour éviter de compter deux fois le même élève (s'il est en retard sur plusieurs trimestres)
        retardsParTrimestre.forEach(trimestre => {
            trimestre.eleves.forEach(eleve => {
                uniqueEleves.add(eleve.nom.toLowerCase());
            });
        });

        return uniqueEleves.size;
    }
    // ---------------------------------------------------------------
    getNombreTotalElevesEnRetardGlobal(): number {
        if (!this.periodData) return 0;

        const uniqueElevesGlobal = new Set<string>();

        this.periodData.forEach(periode => {
            const retardsParTrimestre = this.getElevesEnRetardDetailsParTrimestre(periode);
            retardsParTrimestre.forEach(trimestre => {
                trimestre.eleves.forEach(eleve => {
                    uniqueElevesGlobal.add(eleve.nom.toLowerCase());
                });
            });
        });

        return uniqueElevesGlobal.size;
    }

    // --------------------------------------------------------------------

    // Méthode qui retourne la liste des paiements du jour (aujourd'hui)
    getPaiementsDuJour(): any[] {
        if (!this.paiementData) return [];

        const today = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD

        return this.paiementData.filter(paiement => {
            const paiementDate = paiement.dateDePaiement?.split('T')[0]; // on extrait la date (sans l'heure)
            return paiementDate === today && paiement.typeDeFrais?.toLowerCase() === 'scolarité';
        });
    }

// Méthode qui retourne le montant total des paiements du jour
    getTotalPaiementsDuJour(): number {
        const paiementsDuJour = this.getPaiementsDuJour();
        return paiementsDuJour.reduce((total, paiement) => {
            const montant = parseFloat(
                paiement.montantPaye?.toString().replace(/\s/g, '').replace(',', '.')
            ) || 0;
            return total + montant;
        }, 0);
    }

}
