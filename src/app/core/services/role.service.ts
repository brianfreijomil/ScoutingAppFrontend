import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role } from '../../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private urlApi:string = environment.endpoint + "users/roles";

  constructor(private http:HttpClient) { }

  //get list of roles
  getAll():Observable<Role> {
    return this.http.get<Role>(`${this.urlApi}`);
  }

}
