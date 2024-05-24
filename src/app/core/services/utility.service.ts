import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from './keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private _snackBar:MatSnackBar,
    private _keycloakService:KeycloakService
  ) { }

  showAlert(mesagge:string, type:string) {
    this._snackBar.open(mesagge,type, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }

  getUserProfile() {
    return this._keycloakService.profile;
  }

  getUserTeamId() {
    const userAttributes = this._keycloakService.profile?.attributes;
    if (userAttributes && userAttributes['team_id'] && Array.isArray(userAttributes['team_id'])) {
      const teamId = userAttributes['team_id'][0];
      return teamId;
    }
    return null;
  }
  
}
