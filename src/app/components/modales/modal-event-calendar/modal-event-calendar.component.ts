import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalEditPlayerComponent } from '../modal-edit-player/modal-edit-player.component';
import { SharedModule } from '../../reusable/shared.module';
import { EventClickArg } from '@fullcalendar/core';
import { createEventId } from '../../calendar/event-utils';

@Component({
  selector: 'app-modal-event-calendar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-event-calendar.component.html',
  styleUrl: './modal-event-calendar.component.css'
})
export class ModalEventCalendarComponent implements OnInit {

  titleAction:string = 'Editar';
  btnAction:string = 'Editar';
  showEventInfo:boolean = true;
  showEventForm:boolean = false;
  formEvent:FormGroup;

  eventCalendar: any = {
    title: '',
    date: '',
    description: ''
  }

  meses: string[] = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  constructor(
    private modalCurrent: MatDialogRef<ModalEventCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public eventData:EventClickArg,
    private fb:FormBuilder
  )
  {
    this.formEvent = this.fb.group({
      title: ["",Validators.required],
      dateInit: ["",Validators.required],
      dateEnd: ["",Validators.required],
      description: ["",Validators.required]
    })
  }

  viewEdit() {
    this.showEventInfo = false;
    this.showEventForm = true;
    this.formEvent.patchValue({
      title: this.eventCalendar.title,
      dateInit: this.eventData.event.startStr,
      dateEnd: this.eventData.event.endStr,
      description: this.eventData.event._def.extendedProps['description']
    });
  }

  updateEvent() {

    const calendarApi = this.eventData.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (this.eventCalendar.title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: this.formEvent.value.title,
        start: this.formEvent.value.dateInit,
        end: this.formEvent.value.dateEnd,
        allDay: this.eventData.event.allDay,
        backgroundColor: this.getRandomColor(),
        color: 'black',
        textColor: 'black',
        extendedProps: {
          description: this.formEvent.value.description
        }
      });
      this.eventData.event.remove();
      this.modalCurrent.close("true");
    }
  }

  //genero un color random
  getRandomColor(): string {
    const coloresHex: string[] = [
      '#f7e8a0', // rgb(247, 232, 160)
      '#b4fcae', // rgb(180, 252, 174)
      '#cbfd86', // rgb(203, 253, 134)
      '#a0fbea', // rgb(160, 251, 234)
      '#d99afe', // rgb(217, 154, 254)
      '#e8a3d1', // rgb(232, 163, 209)
      '#1dc355', // rgb(29, 195, 81)
      '#fe7f9d', // rgb(254, 127, 157)
      '#d1e811'  // rgb(209, 232, 17)
    ];
  
    return coloresHex[Math.floor(Math.random() * coloresHex.length)];
  }

  deleteEvent() {
    this.eventData.event.remove();
    this.modalCurrent.close();
  }

  setFormateDate(d1:string, d2:string):string {

    const date1 = new Date(d1);
    const month1 = date1.getMonth();
    const day1 = date1.getDate() + 1;
    const year1 = date1.getFullYear() + 1;

    const date2 = new Date(d2);
    const month2 = date2.getMonth();
    const day2 = date2.getDate() + 1;
    const year2 = date2.getFullYear() + 1;
    //devuelve a todos menos uno
    return '' + this.getMonthName(month1) + ', ' + day1 + ', ' + year1 + ' - ' + 
    this.getMonthName(month2) + ', ' + day2 + ', ' + year2

  }

  getMonthName(num:number): string {
    return this.meses[num];
  }


  ngOnInit(): void {
    if(this.eventData != null) {
      this.eventCalendar = {
        title: this.eventData.event.title,
        date: this.setFormateDate(this.eventData.event.startStr, this.eventData.event.endStr),
        description: this.eventData.event._def.extendedProps['description']
      }
    }
  }

}
