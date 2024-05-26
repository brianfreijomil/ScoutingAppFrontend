import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../reusable/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../../interfaces/player';
import { PlayerService } from '../../../core/services/player.service';
import { UtilityService } from '../../../core/services/utility.service';

@Component({
  selector: 'app-modal-edit-player',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-edit-player.component.html',
  styleUrl: './modal-edit-player.component.css'
})
export class ModalEditPlayerComponent implements OnInit {

  formPlayer:FormGroup;
  hidePassword:boolean = true;
  titleAction:string = 'Editar'
  btnAction:string = 'Editar';

  constructor(
    @Inject(MAT_DIALOG_DATA) public playerData:Player,
    private modalCurrent: MatDialogRef<ModalEditPlayerComponent>,
    private fb:FormBuilder,
    private playerService:PlayerService,
    private utilityService:UtilityService
  ) 
  {

    this.formPlayer = this.fb.group({
      surname: ["",Validators.required],
      name: ["",Validators.required],
      contact: ["",Validators.required],
      status: ["",Validators.required],
      //height: ["",Validators.required],
      //skillLeg: ["",Validators.required],
      category: ["",Validators.required],
      ubication: ["",Validators.required],
      firstPosition: ["",Validators.required],
      //secondPosition: ["",Validators.required],
      //valoration: ["",Validators.required],
      dateSeen: ["",Validators.required],
      //timeSeen: ["",Validators.required],
      divisionSeen: ["",Validators.required],
      teamSeen: ["",Validators.required],
      campSeen: ["",Validators.required],
      contactTeamSeen: ["",Validators.required],
      //characteristics: ["",Validators.required],
      //urlImage: ["",Validators.required]
    });
    
  }

  ngOnInit():void {
    if(this.playerData != null) {

      this.formPlayer.patchValue({
        surname: this.playerData.surname,
        name: this.playerData.name,
        dni: this.playerData.dni,
        contact: this.playerData.contact,
        status: this.playerData.status,
        height: this.playerData.height,
        skillLeg: this.playerData.skillLeg,
        category: this.playerData.category,
        ubication: this.playerData.ubication,
        firstPosition: this.playerData.firstPosition,
        secondPosition: this.playerData.secondPosition,
        valoration: this.playerData.valoration,
        dateSeen: this.playerData.dateSeen,
        timeSeen: this.playerData.timeSeen,
        divisionSeen: this.playerData.divisionSeen,
        teamSeen: this.playerData.teamSeen,
        campSeen: this.playerData.campSeen,
        contactTeamSeen: this.playerData.contactTeamSeen,
        characteristics: this.playerData.characteristics,
        urlImage: this.playerData.urlImage
      })

    }
  }

  updatePlayer() {

    const player:Player = {
      dni: this.playerData.dni,
      surname: this.formPlayer.value.surname,
      name: this.formPlayer.value.name,
      contact:this.formPlayer.value.contact,
      category:this.formPlayer.value.category,
      ubication:this.formPlayer.value.ubication,
      height:this.formPlayer.value.height,
      skillLeg:this.formPlayer.value.skillLeg,
      urlImage:this.formPlayer.value.urlImage,
      firstPosition:this.formPlayer.value.firstPosition,
      secondPosition:this.formPlayer.value.secondPosition,
      valoration:this.formPlayer.value.valoration,
      characteristics:this.formPlayer.value.characteristics,
      scouter:this.playerData.scouter,
      dateSeen:this.formPlayer.value.dateSeen,
      timeSeen:this.formPlayer.value.timeSeen,
      divisionSeen:this.formPlayer.value.divisionSeen,
      teamSeen:this.formPlayer.value.teamSeen,
      campSeen:this.formPlayer.value.campSeen,
      contactTeamSeen:this.formPlayer.value.contactTeamSeen,
      status:this.formPlayer.value.status,
      teamId:this.playerData.teamId
    }
      //UPDATE PLAYER
      this.playerService.update(player).subscribe({
        next: (data) => {
          if(data.status === 'ACCEPTED') {
            this.utilityService.showAlert("El jugador fue modificado", "Exito!");
            this.modalCurrent.close(player);
          }
          else {
            console.log(data.status);
            this.utilityService.showAlert("El jugador no pudo ser modificado", "Error!");
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

}
