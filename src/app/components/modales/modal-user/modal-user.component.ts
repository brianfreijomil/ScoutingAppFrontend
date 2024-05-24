import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';
import { UtilityService } from '../../../core/services/utility.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-modal-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css'
})
export class ModalUserComponent implements OnInit {

  formUser:FormGroup;
  hidePassword:boolean = true;
  titleAction:string = 'Agregar'
  btnAction:string = 'Agregar';
  actionIsUpdate:boolean = false;
  rolesList: any[] = []; //Role

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData:User,
    private modalCurrent: MatDialogRef<ModalUserComponent>,
    private fb:FormBuilder,
    private userService: UserService,
    private utilityService: UtilityService
  ) {

    this.formUser = this.fb.group({
      username: ["",Validators.required],
      email: ["",Validators.required],
      lastName: ["",Validators.required],
      firstName: ["",Validators.required],
      password: ["",Validators.required],
      role: [""]
    });

    if(this.userData != null) {
      this.titleAction = "Editar";
      this.btnAction = "Editar";
      this.actionIsUpdate = true;
    }

  }

  ngOnInit():void {
    if(this.userData != null) {

      this.formUser.patchValue({
        username: this.userData.username,
        email: this.userData.email,
        password: this.userData.email,
        lastName: this.userData.lastName,
        firstName: this.userData.firstName,
        role: this.userData.roles?.at(0)
      })
    }
  }

  createUpdateUser() {

    //if the user doesnt write a role "to create a new user", the role by default is "USER"
    if(this.formUser.value.role.trim().length === 0 && !this.actionIsUpdate) {
      this.formUser.value.role = "USER";
      console.log(this.formUser.value.role);
    }

    const _teamId = this.utilityService.getUserTeamId()
    console.log("teamId: "+_teamId);

    // just by the moment, if te current user is a developer, 
    //then he cannot management create/update of users

    if(_teamId == 0) {
      this.modalCurrent.close("true");
    }

    const user:User = {
      id: this.userData == null ? "" : this.userData.id,
      username: this.formUser.value.username,
      email: this.formUser.value.email,
      lastName: this.formUser.value.lastName,
      firstName: this.formUser.value.firstName,
      password: this.formUser.value.password,
      roles: [`${this.formUser.value.role}`],
      enabled: true,
      teamId: this.utilityService.getUserTeamId()
    }

    //if userData is null then the current user want to create a new user
    //if userData is not null then he wanna update an existing user

    if(this.userData == null) {
      this.userService.save(user).subscribe({
        next: (data) => {
          if(data.status === 'CREATED') {
            this.utilityService.showAlert("El usuario fue creado", "Exito!");
            this.modalCurrent.close('true');
          }
          else {
            console.log(data.status);
            this.utilityService.showAlert("El usuario no pudo ser creado", "Error!");
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      this.userService.update(user).subscribe({
        next: (data) => {
          if(data.status === 'ACCEPTED') {
            this.utilityService.showAlert("El usuario fue modificado", "Exito!");
            this.modalCurrent.close("true");
          }
          else {
            console.log(data.status);
            this.utilityService.showAlert("El usuario no pudo ser modificado", "Error!");
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

}
