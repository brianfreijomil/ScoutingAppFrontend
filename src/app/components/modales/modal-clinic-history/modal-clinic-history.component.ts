import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-clinic-history',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-clinic-history.component.html',
  styleUrl: './modal-clinic-history.component.css'
})
export class ModalClinicHistoryComponent implements OnInit {
  formClinicHistory:FormGroup;
  hidePassword:boolean = true;
  titleAction:string = 'Agregar'
  btnAction:string = 'Agregar';

  fechaPredeterminada:string = Date.now().toString();

  constructor(
    @Inject(MAT_DIALOG_DATA) public clinicHistoryData:any,
    private modalCurrent: MatDialogRef<ModalClinicHistoryComponent>,
    private fb:FormBuilder
  ) {

    this.formClinicHistory = this.fb.group({
      dateRegister: ["",Validators.required],
      title: ["",Validators.required],
      report: ["",Validators.required]
    });

    if(this.clinicHistoryData != null) {
      this.titleAction = "Editar";
      this.btnAction = "Editar";
    }
  }

  ngOnInit():void {
    if(this.clinicHistoryData != null) {

      this.formClinicHistory.patchValue({
        dateRegister: this.clinicHistoryData.dateRegister,
        title: this.clinicHistoryData.title,
        report: this.clinicHistoryData.report
      })

    }
  }

}
