import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment';
import { UpdateStatusSubscribe } from '../../interfaces/update-status-subscribe';
import { StatusUser } from '../../interfaces/status-user';
import { UserLogin } from '../../interfaces/user-login';
import { Session } from '../../interfaces/session';
import { ResponseApi } from '../../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlApi:string = environment.endpoint + "users";

  constructor(private http:HttpClient) { }

  //get list of users by team id
  list(teamId:number):Observable<User> {
    return this.http.get<User>(`${this.urlApi}/team/${teamId}`);
  }

  //Save user
  save(request:User):Observable<User> {
    return this.http.post<User>(`${this.urlApi}`, request);
  }

  //Update user
  update(request:User):Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}/${request.id}`, request);
  }

  //Delete user
  delete(id:number):Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`);
  }

  //update status subscribe
  updateSubscribeStatusByTeamId(request:UpdateStatusSubscribe, teamId:number):Observable<ResponseApi> {
    return this.http.patch<ResponseApi>(`${this.urlApi}/team/${teamId}/subscription`, request);
  }

  //Update status user
  updateStatusUser(request:StatusUser, id:number):Observable<ResponseApi> {
    return this.http.patch<ResponseApi>(`${this.urlApi}/${id}`, request);
  }

  //Login
  loginUser(request:UserLogin):Observable<Session> {
    return this.http.post<Session>(`${this.urlApi}/login`, request);
  }

}
