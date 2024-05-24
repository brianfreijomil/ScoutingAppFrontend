import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Player } from '../../interfaces/player';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private urlApi:string = environment.endpoint + "players";

  constructor(private http:HttpClient) { }

  //get list of players by team id
  getAllPlayersByTeam(teamId:number):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/by_team?team_id=${teamId}`);
  }

  //get player by id
  getPlayerById(id:number):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/${id}`);
  }

  //get player by complete name
  getPlayerByCompleteName(fullName:string):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/by_fullname?full_name=${fullName}`);
  }

  //Save player
  save(request:Player):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}`, request);
  }

  //Update player
  update(request:Player):Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}/${request.dni}`, request);
  }

  //update multimedia player
  updateMultimedia(request:any):Observable<ResponseApi> {
    return this.http.patch<ResponseApi>(`${this.urlApi}/${request.id}`, request)
  }

  //Delete player
  delete(id:number):Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`);
  }

}
