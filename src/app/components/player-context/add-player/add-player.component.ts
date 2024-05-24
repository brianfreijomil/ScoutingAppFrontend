import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuPageComponent } from '../../reusable/menu-page/menu-page.component';
import { HeaderComponent } from '../../reusable/header/header.component';
import { SharedModule } from '../../reusable/shared.module';
import { CommonModule } from '@angular/common';
import { PlayerConfirmModalComponent } from '../../modales/player-confirm-modal/player-confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerService } from '../../../core/services/player.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../core/services/utility.service';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [
    RouterLink,
    MenuPageComponent,
    HeaderComponent,
    SharedModule,
    CommonModule,
    PlayerConfirmModalComponent
  ],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent implements OnInit {

  showFirstForm: boolean = true;
  showErrorFrom:boolean = false;
  formAddPlayer:FormGroup;

  constructor(
    private dialog:MatDialog,
    private fb:FormBuilder,
    private utilityService:UtilityService
  ) {

    this.formAddPlayer = this.fb.group({
      surname: ["",Validators.required],
      name: ["",Validators.required],
      contact: ["",Validators.required],
      category: ["",Validators.required],
      dni: ["",Validators.required],
      ubication: ["",Validators.required],
      firstPosition: ["",Validators.required],
      secondPosition: [""],
      valoration: [""],
      dateSeen: ["",Validators.required],
      timeSeen: [""],
      divisionSeen: ["",Validators.required],
      teamSeen: ["",Validators.required],
      campSeen: ["",Validators.required],
      contactTeamSeen: ["",Validators.required],
      characteristics: [""],
      urlImage: [""]
    });
    
  }
  ngOnInit(): void {
  }

  createPlayer() {

    if(this.formAddPlayer.invalid) {
      this.showErrorFrom = true;
    }
    else {
      this.dialog.open(PlayerConfirmModalComponent, {
        disableClose:true
      }).afterClosed().subscribe(result => {
        if(result === 'true') {
          this.utilityService.showAlert("El jugador fue creado", "Listo!");

          //reset value of this inputs
          this.formAddPlayer.patchValue({
            surname: '',
            name: '',
            contact: '',
            category: '',
            dni: '',
            ubication: '',
            firstPosition: '',
            secondPosition: '',
            valoration: '',
            characteristics: '',
            urlImage: ''
          });

          this.showFirstForm = false;
          this.showErrorFrom = false;

        }
      });
    }

  }

  viewSecondForm() {
    if(
      this.formAddPlayer.value.dateSeen.trim().length === 0 ||
      this.formAddPlayer.value.divisionSeen.trim().length === 0 ||
      this.formAddPlayer.value.teamSeen.trim().length === 0 ||
      this.formAddPlayer.value.campSeen.trim().length === 0 ||
      this.formAddPlayer.value.contactTeamSeen.trim().length === 0
    ) {
      this.showErrorFrom = true;
    }
    else {
      this.showFirstForm = false;
      this.showErrorFrom = false;
    }
  }

}
