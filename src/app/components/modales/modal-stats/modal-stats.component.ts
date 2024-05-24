import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatsService } from '../../../core/services/stats.service';
import { UtilityService } from '../../../core/services/utility.service';
import { Stat } from '../../../interfaces/stat';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public statsData:Stat,
    private modalCurrent: MatDialogRef<ModalStatsComponent>,
    private fb:FormBuilder,
    private statsService:StatsService,
    private  utilityService:UtilityService
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

  createUpdateStat() {

    const stat:Stat = {
      id: this.statsData == null ? 0 : this.statsData.id,
      dateRegister: this.formStats.value.dateRegister,
      matches: this.formStats.value.matches,
      minutes: this.formStats.value.minutes,
      scores: this.formStats.value.scores,
      assists: this.formStats.value.assists,
      yellowCards: this.formStats.value.yellowCards,
      redCards: this.formStats.value.redCards,
      playerId: this.statsData.playerId
    }

    //create STAT
    if(this.statsData == null) {
      this.statsService.save(stat).subscribe({
        next: (data) => {
          if(data.status === 'CREATED') {
            this.utilityService.showAlert("El registro fue creado", "Exito!");
            this.modalCurrent.close(stat);
          }
          else {
            console.log(data.status);
            this.utilityService.showAlert("El registro no pudo ser creado", "Error!");
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      //UPDATE STAT
      this.statsService.update(stat).subscribe({
        next: (data) => {
          if(data.status === 'ACCEPTED') {
            this.utilityService.showAlert("El registro fue modificado", "Exito!");
            this.modalCurrent.close(stat);
          }
          else {
            console.log(data.status);
            this.utilityService.showAlert("El registro no pudo ser modificado", "Error!");
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

}
