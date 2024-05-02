import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalEditPlayerComponent } from '../modal-edit-player/modal-edit-player.component';

@Component({
  selector: 'app-modal-stats',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './modal-stats.component.html',
  styleUrl: './modal-stats.component.css'
})
export class ModalStatsComponent {

  formStats:FormGroup;
  hidePassword:boolean = true;
  titleAction:string = 'Agregar'
  btnAction:string = 'Agregar';

  fechaPredeterminada:string = Date.now().toString();

  @Inject(MAT_DIALOG_DATA) public statsData:any;

  constructor(
    private modalCurrent: MatDialogRef<ModalStatsComponent>,
    private fb:FormBuilder
  ) {

    this.formStats = this.fb.group({
      dateRegister: ["",Validators.required],
      matches: ["",Validators.required],
      minutes: ["",Validators.required],
      scores: ["",Validators.required],
      assists: ["",Validators.required],
      yellowCards: ["",Validators.required],
      redCards: ["",Validators.required]
    });

    if(this.statsData != null) {
      this.titleAction = "Editar";
      this.btnAction = "Editar";
    }
  }

  ngOnInit():void {
    if(this.statsData != null) {

      this.formStats.patchValue({
        dateRegister: this.statsData.dateRegister,
        matches: this.statsData.matches,
        minutes: this.statsData.minutes,
        scores: this.statsData.scores,
        assists: this.statsData.assists,
        yellowCards: this.statsData.yellowCards,
        redCards: this.statsData.redCards
      })

    }
  }

}
