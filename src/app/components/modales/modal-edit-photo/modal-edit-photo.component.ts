import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';

@Component({
  selector: 'app-modal-edit-photo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-edit-photo.component.html',
  styleUrl: './modal-edit-photo.component.css'
})
export class ModalEditPhotoComponent implements OnInit {
  
  formUser:FormGroup;
  titleAction:string = 'Actualizar'
  btnAction:string = 'Actualizar';

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

  }




  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
