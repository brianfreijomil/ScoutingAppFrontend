import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { KeycloakService } from '../../../core/services/keycloak/keycloak.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentUrl: string = "";

  constructor(
    private router: Router, 
    private keycloakService:KeycloakService
  ) { }
  
  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }

  async logout() {
    this.keycloakService.logout();
  }

}
