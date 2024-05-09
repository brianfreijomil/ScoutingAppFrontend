import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Player } from '../../interfaces/player';
import { Observable } from 'rxjs';
import { PlayerSearch } from '../../interfaces/player-search';
import { ResponseEntity } from '../../interfaces/response-entity';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private urlApi:string = environment.endpoint + "players";

  constructor(private http:HttpClient) { }

  //get list of players by team id
  getAllPlayersByTeam(teamId:number):Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.urlApi}/by-team?team_id=${teamId}`);
  }

  //get player by id
  getPlayer(id:number):Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.urlApi}/${id}`);
  }

  //Save player
  save(request:Player):Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(`${this.urlApi}`, request);
  }

  //Update player
  update(request:Player):Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(`${this.urlApi}/${request.dni}`, request);
  }

  //update multimedia player
  updateMultimedia(request:any):Observable<ResponseEntity> {
    return this.http.patch<ResponseEntity>(`${this.urlApi}/${request.id}`, request)
  }

  //Delete player
  delete(id:number):Observable<ResponseEntity> {
    return this.http.delete<ResponseEntity>(`${this.urlApi}/${id}`);
  }

}
