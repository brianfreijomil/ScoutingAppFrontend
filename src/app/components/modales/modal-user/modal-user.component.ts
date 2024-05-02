import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  rolesList: any[] = []; //Role

  @Inject(MAT_DIALOG_DATA) public userData:any;

  constructor(
    private modalCurrent: MatDialogRef<ModalUserComponent>,
    private fb:FormBuilder
  ) {

    this.formUser = this.fb.group({
      username: ["",Validators.required],
      password: ["",Validators.required],
      idRole: ["",Validators.required]
    });

    if(this.userData != null) {
      this.titleAction = "Editar";
      this.btnAction = "Editar";
    }

    // this.roleService.list().subscribe({
    //   next:(data) => {
    //     if(data.status == true) {
    //       this.rolesList = data.value
    //     }
    //   },
    //   error:(err) => {}
    // });

  }

  ngOnInit():void {
    if(this.userData != null) {

      this.formUser.patchValue({
        username: this.userData.nameComplete,
        password: this.userData.mail,
        idRole: this.userData.idRole
      })

    }
  }

}
