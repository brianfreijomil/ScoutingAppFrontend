import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../interfaces/response-api';
import { EventCalendar } from '../../interfaces/event-calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private urlApi:string = environment.endpoint + "calendar/events";
  
  constructor(private http:HttpClient) { }

  //get All events by team Id
  getAllByTeamId(teamId:number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/all-by?team_id=${teamId}`);
  }

  //get event by id
  getById(id:number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/${id}`);
  }

  //create event
  save(event:EventCalendar):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}`, event);
  }

  //update event
  update(event:EventCalendar):Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}/${event.id}`, event);
  }

  //delete event
  delete(id:number):Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`);
  }


}
