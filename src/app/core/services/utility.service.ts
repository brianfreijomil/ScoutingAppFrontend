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

  //genero un color random
  getRandomColor(): string {
    const coloresHex: string[] = [
      '#f7e8a0', // rgb(247, 232, 160)
      '#b4fcae', // rgb(180, 252, 174)
      '#cbfd86', // rgb(203, 253, 134)
      '#a0fbea', // rgb(160, 251, 234)
      '#d99afe', // rgb(217, 154, 254)
      '#e8a3d1', // rgb(232, 163, 209)
      '#1dc355', // rgb(29, 195, 81)
      '#fe7f9d', // rgb(254, 127, 157)
      '#d1e811'  // rgb(209, 232, 17)
    ];
  
    return coloresHex[Math.floor(Math.random() * coloresHex.length)];
  }
  
}
