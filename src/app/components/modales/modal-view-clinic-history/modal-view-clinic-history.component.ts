import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../reusable/shared.module';
import { ClinicHistory } from '../../../interfaces/clinic-history';

@Component({
  selector: 'app-modal-view-clinic-history',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-view-clinic-history.component.html',
  styleUrl: './modal-view-clinic-history.component.css'
})
export class ModalViewClinicHistoryComponent {

  titleModal:string = 'Reporte Clinico'

  fechaPredeterminada:string = Date.now().toString();

  constructor(
    @Inject(MAT_DIALOG_DATA) public clinicHistoryData:ClinicHistory,
    private modalCurrent: MatDialogRef<ModalViewClinicHistoryComponent>
  ) 
  {
  }

}
