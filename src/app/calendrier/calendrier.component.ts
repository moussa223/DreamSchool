import { Component, OnInit } from '@angular/core';
import {CalendrierService} from "./calendrier.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  // ------------------
  planning: any;
  pdfUrl: SafeUrl;
  // -----------------
  currentMonth: any;
  days: string[];
  calendarDays: any;

  constructor(
      private route: ActivatedRoute,
      private planningService: CalendrierService,
      private sanitizer: DomSanitizer
  ) {
    this.currentMonth = new Date(); // Month from your API or logic
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Days of the week
    this.generateCalendar();
  }
  generateCalendar() {
    this.calendarDays = [];
    const startDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1).getDay();
    const totalDaysInMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= totalDaysInMonth; i++) {
      const day = (startDay + i - 1) % 7; // Calculate the day index (0 - 6)
      this.calendarDays.push({ day: i, dayOfWeek: this.days[day] });
    }
  }
  ngOnInit(): void {
    const id = 2; // ID 2 statique pour l'exemple
    this.planningService.getPlanningById(id).subscribe((data) => {
      this.planning = data;
      console.log(this.planning);

      if (this.planning && this.planning.pdfFile) {
        const byteCharacters = atob(this.planning.pdfFile);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      } else {
        console.error('PDF file not found in the response');
      }
    }, error => {
      console.error('Error fetching planning', error);
    });
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }



}
