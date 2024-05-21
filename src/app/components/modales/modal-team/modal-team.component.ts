import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from '../../../interfaces/team';
import { TeamService } from '../../../core/services/team.service';
import { UtilityService } from '../../../core/services/utility.service';

@Component({
  selector: 'app-modal-team',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-team.component.html',
  styleUrl: './modal-team.component.css'
})
export class ModalTeamComponent implements OnInit {

  formTeam:FormGroup;
  titleAction:string = 'Agregar'
  btnAction:string = 'Agregar';

  constructor(
    @Inject(MAT_DIALOG_DATA) public teamData:Team,
    private modalCurrent: MatDialogRef<ModalTeamComponent>,
    private fb:FormBuilder,
    private teamService: TeamService,
    private utilityService: UtilityService
  ) {

    this.formTeam = this.fb.group({
      name: ["",Validators.required],
      email: ["",Validators.required],
      contactNumber: ["",Validators.required],
      subscribed: ["",Validators.required],
      dateOfExpired: ["",Validators.required]
    });

    if(this.teamData != null) {
      this.titleAction = "Editar";
      this.btnAction = "Editar";
    }

  }

  ngOnInit():void {
    if(this.teamData != null) {

      this.formTeam.patchValue({
        name: this.teamData.name,
        email: this.teamData.email,
        contactNumber: this.teamData.contactNumber,
        subscribed: this.teamData.subscribed,
        dateOfExpired: this.teamData.dateOfExpired
      })
    }
  }

  createUpdateTeam() {
    const team:Team = {
      id: this.teamData == null ? 0 : this.teamData.id,
      name: this.formTeam.value.name,
      email: this.formTeam.value.email,
      contactNumber: this.formTeam.value.contactNumber,
      subscribed: this.formTeam.value.subscribed,
      dateOfExpired: this.formTeam.value.dateOfExpired
    }

    if(this.teamData == null) {
      this.teamService.save(team).subscribe({
        next: (data) => {
          if(data.status === 'CREATED') {
            this.utilityService.showAlert("El equipo fue registrado", "Exito!");
            this.modalCurrent.close("true");
          }
          else {
            console.log(data.status);
            this.utilityService.showAlert("El equipo no pudo ser registrado", "Error!");
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      this.teamService.update(team).subscribe({
        next: (data) => {
          if(data.status === 'ACCEPTED') {
            this.utilityService.showAlert("El equipo fue editado", "Exito!");
            this.modalCurrent.close("true");
          }
          else {
            console.log(data.status);
            this.utilityService.showAlert("El equipo no pudo ser editado", "Error!");
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

}
