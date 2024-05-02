import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuPageComponent } from '../../reusable/menu-page/menu-page.component';
import { HeaderComponent } from '../../reusable/header/header.component';
import { SharedModule } from '../../reusable/shared.module';
import { CommonModule } from '@angular/common';
import { PlayerConfirmModalComponent } from '../../modales/player-confirm-modal/player-confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [RouterLink,MenuPageComponent,HeaderComponent,SharedModule,CommonModule],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {

  addPlayersPart1: boolean = true;

  constructor(private dialog:MatDialog) {
    
  }

  viewFirstPartAddPlayers() {
    this.addPlayersPart1 = true;
  }

  viewSecondPartAddPlayers() {
    this.addPlayersPart1 = false;
  }

  createPlayer() {
    this.dialog.open(PlayerConfirmModalComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result == "true") this.addPlayersPart1 = true;
    });
  }

}
