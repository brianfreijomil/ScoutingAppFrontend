import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../reusable/header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';
import { SharedModule } from '../reusable/shared.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, MenuPageComponent, SharedModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
   console.log('yeah');
  }


}
