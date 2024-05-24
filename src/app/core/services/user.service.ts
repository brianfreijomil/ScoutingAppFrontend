import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment';
import { ResponseApi } from '../../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlApi:string = environment.endpoint + "users";

  constructor(private http:HttpClient) { }

  //get all users of system
  getAllUsers(idCurrentUser:string):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}?id_current_user=${idCurrentUser}`);
  }

  //get list of users by team id
  getAllByTeamId(teamId:number):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/search?team_id=${teamId}`);
  }

  //get user by username
  getByUsername(username:string):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/${username}`);
  }

  //Save user
  save(request:User):Observable<ResponseApi> {
    console.log(request);
    return this.http.post<ResponseApi>(`${this.urlApi}`, request);
  }

  //Update user
  update(request:User):Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}/${request.id}`, request);
  }

  //Delete user
  delete(id:string):Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`);
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
