import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, signal } from '@angular/core';
import { SharedModule } from '../reusable/shared.module';
import { HeaderComponent } from '../reusable/header/header.component';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventCalendarComponent } from '../modales/modal-event-calendar/modal-event-calendar.component';
import { RouterOutlet } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventApi, EventChangeArg, EventClickArg, EventInput } from '@fullcalendar/core';
import { ModalCreateEventCalendarComponent } from '../modales/modal-create-event-calendar/modal-create-event-calendar.component';
import { CalendarService } from '../../core/services/calendar.service';
import { UtilityService } from '../../core/services/utility.service';
import { EventCalendar } from '../../interfaces/event-calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    MenuPageComponent,
    FullCalendarModule,
    CommonModule,
    RouterOutlet,
    ModalCreateEventCalendarComponent,
    ModalEventCalendarComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  //events from api
  eventsApi:EventCalendar[] = [];
  //event from calendar
  eventsCalendar:EventInput[] = [];

  //hide/show calendar
  calendarVisible = signal(true);

  //options to init the calendar
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
    initialEvents: [],
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventChange: this.handleEventChange.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });

  //current events
  currentEvents = signal<EventApi[]>([]);

  constructor(
    private changeDetector: ChangeDetectorRef, 
    private dialog:MatDialog,
    private calendarService: CalendarService,
    private utilityService: UtilityService
  ) {
  }

  //update event
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

  //select date to create event
  handleDateSelect(selectInfo: DateSelectArg) {

    this.dialog.open(ModalCreateEventCalendarComponent, {
      disableClose:true,
      data: selectInfo
    }).afterClosed().subscribe(result => {
      if(result === 'CREATED') {
        this.utilityService.showAlert("El evento fue creado","Listo!");
      }
      else if('CLOSED') {
        //...
      }
      else {
        this.utilityService.showAlert("El evento no pudo ser creado","Error!");
      }
    });
  }

  //select event on calendar
  handleEventClick(clickInfo: EventClickArg) {

    const idEventClick = parseInt(clickInfo.event.id);
    const evApi = this.eventsApi.find(e => e.id === idEventClick);

    const eventApiAndCalendar = {
      eventApi: evApi,
      eventCalendar: clickInfo
    }

    this.dialog.open(ModalEventCalendarComponent, {
      disableClose:true,
      data: eventApiAndCalendar
    }).afterClosed().subscribe(result => {
      if(result === 'UPDATED') {
        this.utilityService.showAlert("Se modifico el evento","Listo!")
      }
      else if(result === 'DELETED') {
        this.utilityService.showAlert("Se elimino el evento","Listo!")
      }
      else if(result === 'CLOSE') {
        //...
      }
      else {
        this.utilityService.showAlert("Lo sentimos,No se pudo realizar la accion","Error!")
      }
    });
  }

  //catch and set changes on events from calendar
  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  convertEventsToEventsApi() {
    this.eventsApi.forEach(eventApi => {
      this.eventsCalendar.push({
        id: String(eventApi.id),
        title: eventApi.title,
        start: eventApi.dateInit,
        end: eventApi.dateEnd,
        allDay: true,
        backgroundColor: this.utilityService.getRandomColor(),
        color: 'black',
        textColor: 'black',
        extendedProps: {
          description: eventApi.description
        }
      });
    })

    // Actualiza la opción events del calendario
    this.calendarOptions.update((options) => ({
      ...options,
      events: this.eventsCalendar,
    }));

  }

  getEventsCalendar() {
    const teamId = this.utilityService.getUserTeamId();
    this.calendarService.getAllByTeamId(teamId).subscribe({
      next: (data) => {
        if(data.status === 'OK') {
          this.eventsApi = data.body;
          this.convertEventsToEventsApi();
        }
        else {
          console.log(data.status);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    //get event from api and convert to EventApi[]
    this.getEventsCalendar();
  }

}
