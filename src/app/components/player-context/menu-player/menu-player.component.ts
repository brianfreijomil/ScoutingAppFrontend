import { Component } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { RouterLink } from '@angular/router';
import { MenuPageComponent } from '../../reusable/menu-page/menu-page.component';
import { HeaderComponent } from '../../reusable/header/header.component';

@Component({
  selector: 'app-menu-player',
  standalone: true,
  imports: [SharedModule,RouterLink,MenuPageComponent,HeaderComponent],
  templateUrl: './menu-player.component.html',
  styleUrl: './menu-player.component.css'
})
export class MenuPlayerComponent {

}
