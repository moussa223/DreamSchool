import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  currentMonth: any;
  days: string[];
  calendarDays: any;

  constructor() {
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
