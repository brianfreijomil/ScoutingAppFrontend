import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { ResponseEntity } from "../../interfaces/response-entity";
import { Team } from "../../interfaces/team";

@Injectable({
    providedIn: 'root'
  })
  export class StatsService {
  
    private urlApi:string = environment.endpoint + "teams";
  
    constructor(private http:HttpClient) { }

    //get all teams
    getAll():Observable<ResponseEntity> {
        return this.http.get<ResponseEntity>(this.urlApi);
    }

    //get team by Id
    getById(id:number):Observable<ResponseEntity> {
        return this.http.get<ResponseEntity>(`${this.urlApi}/${id}`);
    }

    //save team
    save(team:Team):Observable<ResponseEntity> {
        return this.http.post<ResponseEntity>(`${this.urlApi}`, team);
    }

    //update team
    update(team:Team):Observable<ResponseEntity> {
        return this.http.put<ResponseEntity>(`${this.urlApi}/${team.id}`, team);
    }

    //update subscription team
    updateSubscriptionById(id:number, status:boolean):Observable<ResponseEntity> {
        return this.http.get<ResponseEntity>(`${this.urlApi}/${id}/subscription?sub=${status}`);
    }

    //delete team
    delete(id:number):Observable<ResponseEntity> {
        return this.http.delete<ResponseEntity>(`${this.urlApi}/${id}`);
    }




}