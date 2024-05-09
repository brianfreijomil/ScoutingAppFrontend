import { Injectable } from '@angular/core';
import { Stat } from '../../interfaces/stat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseEntity } from '../../interfaces/response-entity';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private urlApi:string = environment.endpoint + "stats";

  constructor(private http:HttpClient) { }

  //Save stats
  save(request:Stat):Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(`${this.urlApi}`, request);
  }

  //Update stats
  update(request:Stat):Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(`${this.urlApi}/${request.id}`, request);
  }

  //Delete stats
  delete(id:number):Observable<ResponseEntity> {
    return this.http.delete<ResponseEntity>(`${this.urlApi}/${id}`);
  }

}
