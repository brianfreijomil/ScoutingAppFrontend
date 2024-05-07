import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../reusable/header/header.component';
import { RouterLink } from '@angular/router';
import { KeycloakService } from '../../core/services/keycloak/keycloak.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  
  constructor(
    private keycloakService: KeycloakService
  ) {}
  
  async ngOnInit() {
    await this.keycloakService.init();
    await this.keycloakService.login();
  }

}
