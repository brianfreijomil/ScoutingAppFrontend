import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../reusable/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  @Inject(MAT_DIALOG_DATA) public userData:any;

  constructor(
    private modalCurrent: MatDialogRef<ModalEditPlayerComponent>,
    private fb:FormBuilder
  ) 
  {

    this.formPlayer = this.fb.group({
      surname: ["",Validators.required],
      name: ["",Validators.required],
      document: ["",Validators.required],
      contact: ["",Validators.required],
      status: ["",Validators.required],
      height: ["",Validators.required],
      skillLeg: ["",Validators.required],
      category: ["",Validators.required],
      ubication: ["",Validators.required],
      firstPosition: ["",Validators.required],
      secondPosition: ["",Validators.required],
      valoration: ["",Validators.required],
      dateRegister: ["",Validators.required],
      timeRegister: ["",Validators.required],
      division: ["",Validators.required],
      team: ["",Validators.required],
      stadiumTeam: ["",Validators.required],
      contactTeam: ["",Validators.required],
      characteristics: ["",Validators.required],
      imgPlayer: ["",Validators.required]
    });
    
  }

  ngOnInit():void {
    if(this.userData != null) {

      this.formPlayer.patchValue({
        surname: this.userData.surname,
        name: this.userData.name,
        document: this.userData.document,
        contact: this.userData.contact,
        status: this.userData.status,
        height: this.userData.height,
        skillLeg: this.userData.skillLeg,
        category: this.userData.category,
        ubication: this.userData.ubication,
        firstPosition: this.userData.firstPosition,
        secondPosition: this.userData.secondPosition,
        valoration: this.userData.valoration,
        dateRegister: this.userData.dateRegister,
        timeRegister: this.userData.timeRegister,
        division: this.userData.division,
        team: this.userData.team,
        stadiumTeam: this.userData.stadiumTeam,
        contactTeam: this.userData.contactTeam,
        characteristics: this.userData.characteristics,
        imgPlayer: this.userData.imgPlayer
      })

    }
  }

}
