import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../../interfaces/player';
import { PlayerService } from '../../../core/services/player.service';

@Component({
  selector: 'app-player-confirm-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './player-confirm-modal.component.html',
  styleUrl: './player-confirm-modal.component.css'
})
export class PlayerConfirmModalComponent implements OnInit {

  player:Player | undefined;

  constructor(
    private playerService: PlayerService,
    @Inject(MAT_DIALOG_DATA) public playerData:Player,
    private modalCurrent: MatDialogRef<PlayerConfirmModalComponent>,
  ) 
  {
      this.player = playerData;
  }

  createPlayer() {
    this.playerService.save(this.player!).subscribe({
      next: (data) => {
        if(data.status === 'CREATED') {
          this.modalCurrent.close('true');
        }
        else {
          console.log(data.status);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit():void {
    if(this.playerData != null) {

    }
  }


}
