import { Injectable } from '@angular/core';
import { Stat } from '../../interfaces/stat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseApi } from '../../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private urlApi:string = environment.endpoint + "stats";

  constructor(private http:HttpClient) { }

  //Save stats
  save(request:Stat):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}`, request);
  }

  //Update stats
  update(request:Stat):Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}/${request.id}`, request);
  }

  //Delete stats
  delete(id:number):Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`);
  }

}
