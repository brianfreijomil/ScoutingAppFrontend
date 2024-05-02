import { Component } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-player-confirm-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './player-confirm-modal.component.html',
  styleUrl: './player-confirm-modal.component.css'
})
export class PlayerConfirmModalComponent {

  constructor(
    private modalCurrent: MatDialogRef<PlayerConfirmModalComponent>,
    ) {

  }


}
