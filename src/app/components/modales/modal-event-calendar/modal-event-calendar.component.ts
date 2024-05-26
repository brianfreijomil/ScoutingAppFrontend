import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalEditPlayerComponent } from '../modal-edit-player/modal-edit-player.component';
import { SharedModule } from '../../reusable/shared.module';
import { EventClickArg } from '@fullcalendar/core';
import { EventCalendar } from '../../../interfaces/event-calendar';
import { UtilityService } from '../../../core/services/utility.service';
import { CalendarService } from '../../../core/services/calendar.service';

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
  formEvent:FormGroup;

  eventCalendarToShow: any = {
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
    @Inject(MAT_DIALOG_DATA) public eventData:any,
    private fb:FormBuilder,
    private utilityService:UtilityService,
    private calendarService:CalendarService
  )
  {
    this.formEvent = this.fb.group({
      title: ["",Validators.required],
      dateInit: ["",Validators.required],
      dateEnd: ["",Validators.required],
      description: ["",Validators.required]
    })
  }

  viewEditContext() {
    this.showEventInfo = false;
    this.formEvent.patchValue({
      title: this.eventCalendarToShow.title,
      dateInit: this.eventData.eventCalendar.event.startStr,
      dateEnd: this.eventData.eventCalendar.event.endStr,
      description: this.eventData.eventCalendar.event._def.extendedProps['description']
    });
  }

  updateEvent() {

    const idScouter = this.utilityService.getUserProfile().id!;
    const surnameScouter = this.utilityService.getUserProfile().lastName!;
    const nameScouter = this.utilityService.getUserProfile().firstName!;

    const eventToPersist:EventCalendar = {
      id: this.eventData.eventApi.id,
      title: this.formEvent.value.title,
      dateInit: this.formEvent.value.dateInit,
      dateEnd: this.formEvent.value.dateEnd,
      description: this.formEvent.value.description,
      teamId: parseInt(this.utilityService.getUserTeamId()),
      scouters: this.eventData.eventApi.scouters
    }

    this.calendarService.update(eventToPersist).subscribe({
      next: (data) => {
        if(data.status === 'ACCEPTED') {

          const calendarApi = this.eventData.eventCalendar.view.calendar;
          calendarApi.unselect(); // clear date selection

          if (this.eventCalendarToShow.title) {
            calendarApi.addEvent({
              id: String(this.eventData.eventApi.id),
              title: this.formEvent.value.title,
              start: this.formEvent.value.dateInit,
              end: this.formEvent.value.dateEnd,
              allDay: this.eventData.eventCalendar.event.allDay,
              backgroundColor: this.utilityService.getRandomColor(),
              color: 'black',
              textColor: 'black',
              extendedProps: {
                description: this.formEvent.value.description
              }
            });
            this.eventData.eventCalendar.event.remove();
          }
          this.modalCurrent.close('UPDATED');
        }
        else {
          console.log(data.status);
          this.modalCurrent.close('ERROR');
        }
      },
      error: (data) => {
        console.log(data);
      }
    })
  }

  deleteEvent() {

    this.calendarService.delete(this.eventData.eventApi.id).subscribe({
      next: (data) => {
        if(data.status === 'OK') {
          this.eventData.eventCalendar.event.remove();
          this.modalCurrent.close('DELETED');
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

  setFormateDate(d1:string, d2:string):string {

    // Crear objetos Date a partir de los strings de entrada
    const date1 = this.createDateFromString(d1);
    const date2 = this.createDateFromString(d2);

    // Obtener día, mes y año de las fechas
    const day1 = date1.getDate();
    const month1 = date1.toLocaleString('default', { month: 'long' });
    const year1 = date1.getFullYear();

    const day2 = date2.getDate();
    const month2 = date2.toLocaleString('default', { month: 'long' });
    const year2 = date2.getFullYear();

    // Verificar si el año es el mismo
    if (year1 === year2) {
      // Verificar si el mes es el mismo
      if (month1 === month2) {
        return `Desde el ${day1} - hasta el ${day2} de ${month1} de ${year1}`;
      } else {
        return `Desde el ${day1} de ${month1} - hasta el ${day2} de ${month2} de ${year1}`;
      }
    } else {
      return `Desde el ${day1} de ${month1} de ${year1} - hasta el ${day2} de ${month2} de ${year2}`;
    }

  }
  // Función auxiliar para crear una fecha sin ajustar la zona horaria
  createDateFromString(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // month es 0-indexado
  }

  getMonthName(num:number): string {
    return this.meses[num];
  }


  ngOnInit(): void {
    if(this.eventData != null) {
      this.eventCalendarToShow = {
        title: this.eventData.eventCalendar.event.title,
        date: this.setFormateDate(this.eventData.eventCalendar.event.startStr, this.eventData.eventCalendar.event.endStr),
        description: this.eventData.eventCalendar.event._def.extendedProps['description']
      };
    }
  }

}
