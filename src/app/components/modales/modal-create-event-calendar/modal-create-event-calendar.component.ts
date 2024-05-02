import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { SharedModule } from '../../reusable/shared.module';
import { createEventId } from '../../calendar/event-utils';

@Component({
  selector: 'app-modal-create-event-calendar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-create-event-calendar.component.html',
  styleUrl: './modal-create-event-calendar.component.css'
})
export class ModalCreateEventCalendarComponent {

  titleAction:string = 'Agregar';
  btnAction:string = 'Agregar';
  formEvent:FormGroup;

  eventCalendar: any = {
    title: '',
    dateInit: '',
    dateEnd: '',
    description: ''
  }

  constructor(
    private modalCurrent: MatDialogRef<ModalCreateEventCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public selectInfo:DateSelectArg,
    private fb:FormBuilder
  )
  {
    this.formEvent = this.fb.group({
      title: ["",Validators.required],
      dateInit: [selectInfo.startStr,Validators.required],
      dateEnd: [selectInfo.endStr,Validators.required],
      description: ["",Validators.required]
    })
  }

  saveEvent() {

    console.log(this.formEvent.value.dateInit);

    this.eventCalendar = {
      title: this.formEvent.value.title,
      dateInit: this.formEvent.value.dateInit,
      dateEnd: this.formEvent.value.dateEnd,
      description: this.formEvent.value.description
    }

    const calendarApi = this.selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (this.eventCalendar.title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: this.eventCalendar.title,
        start: this.eventCalendar.dateInit,
        end: this.eventCalendar.dateEnd,
        allDay: this.selectInfo.allDay,
        backgroundColor: this.getRandomColor(),
        color: 'black',
        textColor: 'black',
        extendedProps: {
          description: this.eventCalendar.description
        }
      });
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


}
