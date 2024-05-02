import { Injectable } from '@angular/core';
import { ClinicHistory } from '../../interfaces/clinic-history';
import { ResponseApi } from '../../interfaces/response-api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {

  private urlApi:string = environment.endpoint + "clinic-history";

  constructor(private http:HttpClient) { }

  //save clinic history report
  save(request:ClinicHistory):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}`, request);
  }

  //update clinic history
  update(request:ClinicHistory):Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}/${request.id}`, request);
  }

  //delete clinic history
  delete(id:number):Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`);
  }

}
