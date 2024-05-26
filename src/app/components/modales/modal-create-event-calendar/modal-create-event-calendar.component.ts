import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { SharedModule } from '../../reusable/shared.module';
import { UtilityService } from '../../../core/services/utility.service';
import { CalendarService } from '../../../core/services/calendar.service';
import { Scouter } from '../../../interfaces/scouter';
import { EventCalendar } from '../../../interfaces/event-calendar';

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
  scouters:Scouter[] = [];

  constructor(
    private modalCurrent: MatDialogRef<ModalCreateEventCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public selectInfo:DateSelectArg,
    private fb:FormBuilder,
    private utilityService: UtilityService,
    private calendarService: CalendarService
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

    const idScouter = this.utilityService.getUserProfile().id!;
    const surnameScouter = this.utilityService.getUserProfile().lastName!;
    const nameScouter = this.utilityService.getUserProfile().firstName!;

    const eventToPersist:EventCalendar = {
      id: 0,
      title: this.formEvent.value.title,
      dateInit: this.formEvent.value.dateInit,
      dateEnd: this.formEvent.value.dateEnd,
      description: this.formEvent.value.description,
      teamId: this.utilityService.getUserTeamId(),
      scouters: [
        {
          id: idScouter, 
          surname: surnameScouter,
          name: nameScouter
        }
      ]
    }

    //persist event in the api
    this.calendarService.save(eventToPersist).subscribe({
      next: (data) => {
        if(data.status === 'CREATED') {
          //persis event in the current calendar
          const calendarApi = this.selectInfo.view.calendar;
          calendarApi.unselect(); // clear date selection

          if (eventToPersist.title) {
            calendarApi.addEvent({
              id: String(data.body),
              title: eventToPersist.title,
              start: eventToPersist.dateInit,
              end: eventToPersist.dateEnd,
              allDay: this.selectInfo.allDay,
              backgroundColor: this.utilityService.getRandomColor(),
              color: 'black',
              textColor: 'black',
              extendedProps: {
                description: eventToPersist.description
              }
            });
            this.modalCurrent.close('CREATED');
          }
        }
        else {
          console.log(data.status);
          this.modalCurrent.close('ERROR');
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

}
