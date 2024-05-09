import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment';
import { ResponseEntity } from '../../interfaces/response-entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlApi:string = environment.endpoint + "users";

  constructor(private http:HttpClient) { }

  //get list of users by team id
  getAllByTeamId(teamId:number):Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.urlApi}/search?team_id=${teamId}`);
  }

  //get user by username
  getByUsername(username:string):Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.urlApi}/${username}`);
  }

  //Save user
  save(request:User):Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(`${this.urlApi}`, request);
  }

  //Update user
  update(request:User):Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(`${this.urlApi}/${request.id}`, request);
  }

  //Delete user
  delete(id:number):Observable<ResponseEntity> {
    return this.http.delete<ResponseEntity>(`${this.urlApi}/${id}`);
  }

  //update status subscribe
  // updateSubscribeStatusByTeamId(request:UpdateStatusSubscribe, teamId:number):Observable<ResponseEntity> {
  //   return this.http.patch<ResponseEntity>(`${this.urlApi}/team/${teamId}/subscription`, request);
  // }

  //Update status user
  // updateStatusUser(request:StatusUser, id:number):Observable<ResponseEntity> {
  //   return this.http.patch<ResponseEntity>(`${this.urlApi}/${id}`, request);
  // }

  //Login
  // loginUser(request:UserLogin):Observable<Session> {
  //   return this.http.post<Session>(`${this.urlApi}/login`, request);
  // }

}
