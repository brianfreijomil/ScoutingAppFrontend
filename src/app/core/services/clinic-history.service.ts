import { Injectable } from '@angular/core';
import { ClinicHistory } from '../../interfaces/clinic-history';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponseEntity } from '../../interfaces/response-entity';

@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {

  private urlApi:string = environment.endpoint + "clinic_history";

  constructor(private http:HttpClient) { }

  //save clinic history report
  save(request:ClinicHistory):Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(`${this.urlApi}`, request);
  }

  //update clinic history
  update(request:ClinicHistory):Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(`${this.urlApi}/${request.id}`, request);
  }

  //delete clinic history
  delete(id:number):Observable<ResponseEntity> {
    return this.http.delete<ResponseEntity>(`${this.urlApi}/${id}`);
  }

}
