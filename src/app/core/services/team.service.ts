import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Team } from "../../interfaces/team";
import { ResponseApi } from "../../interfaces/response-api";

@Injectable({
    providedIn: 'root'
  })
  export class StatsService {
  
    private urlApi:string = environment.endpoint + "teams";
  
    constructor(private http:HttpClient) { }

    //get all teams
    getAll():Observable<ResponseApi> {
        return this.http.get<ResponseApi>(this.urlApi);
    }

    //get team by Id
    getById(id:number):Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}/${id}`);
    }

    //save team
    save(team:Team):Observable<ResponseApi> {
        return this.http.post<ResponseApi>(`${this.urlApi}`, team);
    }

    //update team
    update(team:Team):Observable<ResponseApi> {
        return this.http.put<ResponseApi>(`${this.urlApi}/${team.id}`, team);
    }

    //update subscription team
    updateSubscriptionById(id:number, status:boolean):Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}/${id}/subscription?sub=${status}`);
    }

    //delete team
    delete(id:number):Observable<ResponseApi> {
        return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`);
    }




}