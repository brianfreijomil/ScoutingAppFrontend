import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Player } from '../../interfaces/player';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../interfaces/response-api';
import { PlayerSearch } from '../../interfaces/player-search';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private urlApi:string = environment.endpoint + "players";

  constructor(private http:HttpClient) { }

  //get list of players by team id
  getAllPlayersByTeam(teamId:number):Observable<PlayerSearch> {
    return this.http.get<PlayerSearch>(`${this.urlApi}/?teamId=${teamId}`);
  }

  //get player by id
  getPlayer(id:number):Observable<Player> {
    return this.http.get<Player>(`${this.urlApi}/${id}`);
  }

  //Save player
  save(request:Player):Observable<Player> {
    return this.http.post<Player>(`${this.urlApi}`, request);
  }

  //Update player
  update(request:Player):Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}/${request.id}`, request);
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
