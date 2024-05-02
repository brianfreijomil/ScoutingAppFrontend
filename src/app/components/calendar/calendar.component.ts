import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, signal } from '@angular/core';
import { SharedModule } from '../reusable/shared.module';
import { HeaderComponent } from '../reusable/header/header.component';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventCalendarComponent } from '../modales/modal-event-calendar/modal-event-calendar.component';
import { RouterOutlet } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventApi, EventChangeArg, EventClickArg } from '@fullcalendar/core';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { ModalCreateEventCalendarComponent } from '../modales/modal-create-event-calendar/modal-create-event-calendar.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    MenuPageComponent,
    FullCalendarModule,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  //oculto muestro el calendario
  calendarVisible = signal(true);

  //opciones calendario
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventChange: this.handleEventChange.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });

  //eventos actuales
  currentEvents = signal<EventApi[]>([]);
  resultAction:boolean = false;

  constructor(private changeDetector: ChangeDetectorRef, private dialog:MatDialog) {
  }

  //actualizar evento
  handleEventChange(changeInfo: EventChangeArg) {
    // Aquí puedes acceder al evento modificado
    const changedEvent = changeInfo.event;
  
    // Actualiza el evento en tu backend o realiza otras acciones necesarias
    // Por ejemplo:
    // Llamar a un servicio para actualizar el evento en la base de datos
  
    // Luego, puedes actualizar los eventos en el calendario
  }

  //aparece desaparece el calendario
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  //seleccion de una fecha para crear evento
  handleDateSelect(selectInfo: DateSelectArg) {

    this.dialog.open(ModalCreateEventCalendarComponent, {
      disableClose:true,
      data: selectInfo
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });

    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  //seleccion de un evento en el calendario
  handleEventClick(clickInfo: EventClickArg) {
    this.dialog.open(ModalEventCalendarComponent, {
      disableClose:true,
      data: clickInfo
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  //detecta y setea cambios en los eventos del calendar
  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

}
