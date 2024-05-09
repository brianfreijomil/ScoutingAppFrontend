import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseEntity } from '../../interfaces/response-entity';
import { EventCalendar } from '../../interfaces/event-calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private urlApi:string = environment.endpoint + "calendar/events";
  
  constructor(private http:HttpClient) { }

  //get All events by team Id
  getAllByTeamId(teamId:number): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.urlApi}/${teamId}`);
  }

  //get event by id
  getById(id:number): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.urlApi}/${id}`);
  }

  //create event
  save(event:EventCalendar):Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(`${this.urlApi}`, event);
  }

  //update event
  update(event:EventCalendar):Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(`${this.urlApi}/&${event.id}`, event);
  }

  //delete event
  delete(id:number):Observable<ResponseEntity> {
    return this.http.delete<ResponseEntity>(`${this.urlApi}/&${id}`);
  }


}
