import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClinicHistory } from '../../../interfaces/clinic-history';
import { ClinicHistoryService } from '../../../core/services/clinic-history.service';
import { UtilityService } from '../../../core/services/utility.service';

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
    @Inject(MAT_DIALOG_DATA) public clinicHistoryData:ClinicHistory,
    private modalCurrent: MatDialogRef<ModalClinicHistoryComponent>,
    private fb:FormBuilder,
    private clinicHistoryService:ClinicHistoryService,
    private utilityService:UtilityService
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

  createUpdateClinicReport() {

    const clinicReport:ClinicHistory = {
      id: this.clinicHistoryData == null ? 0 : this.clinicHistoryData.id,
      title: this.formClinicHistory.value.title,
      dateRegister: this.formClinicHistory.value.dateRegister,
      report: this.formClinicHistory.value.report,
      playerId: this.clinicHistoryData.playerId
    }

    //create STAT
    if(this.clinicHistoryData == null) {
      this.clinicHistoryService.save(clinicReport).subscribe({
        next: (data) => {
          if(data.status === 'CREATED') {
            this.utilityService.showAlert("El registro fue creado", "Exito!");
            this.modalCurrent.close(clinicReport);
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
      this.clinicHistoryService.update(clinicReport).subscribe({
        next: (data) => {
          if(data.status === 'ACCEPTED') {
            this.utilityService.showAlert("El registro fue modificado", "Exito!");
            this.modalCurrent.close(clinicReport);
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
