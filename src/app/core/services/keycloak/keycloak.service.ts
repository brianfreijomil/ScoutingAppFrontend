import { Injectable } from "@angular/core";
import Keycloak from "keycloak-js";
import { UserProfile } from "./user-profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak : Keycloak | undefined;
  private _profile : UserProfile | undefined;
  private _urlKeycloak : string = 'http://localhost:8181';
  private _realm : string = 'scouting-system';
  private _clientId : string = 'scoutingsys';

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: this._urlKeycloak,
        realm: this._realm,
        clientId: this._clientId
      });
    }
    return this._keycloak;
  }

  get profile():UserProfile | undefined {
    return this._profile;
  }
  
  constructor() { }

  async init() {
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required'
    });

    if(authenticated) {
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token; 
    }
  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout();
  }

}
