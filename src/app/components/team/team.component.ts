import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../reusable/header/header.component';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../reusable/shared.module';
import { Team } from '../../interfaces/team';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TeamService } from '../../core/services/team.service';
import { UtilityService } from '../../core/services/utility.service';
import { ModalTeamComponent } from '../modales/modal-team/modal-team.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    HeaderComponent, 
    MenuPageComponent,
    CommonModule,
    SharedModule,
    ModalTeamComponent
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit, AfterViewInit {

  columnsTable:string[] = ['name','email','contact','subscribed','dateOfExpired','actions'];
  datainit:Team[] = [];
  dataTeamList = new MatTableDataSource(this.datainit);
  @ViewChild(MatPaginator)tablePagination!:MatPaginator;

  constructor(
    private dialog: MatDialog, 
    private teamService: TeamService,
    private utilityService: UtilityService
  ) {

  }

  getTeams() {
    this.teamService.getAll().subscribe({
      next:(data) => {
        if(data.status === 'OK') {
          this.dataTeamList = data.body;
        }
        else
          console.log("No error but No data");
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  getTeamById(id:number) {
    this.teamService.getById(id).subscribe({
      next: (data) => {
        if(data.status === 'OK') {
          console.log(data.body);
        }
        else {
          console.log("no error, but no data");
        }
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  createTeam() {
    this.dialog.open(ModalTeamComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result === 'true') {
        this.getTeams();
      }
    });
  }

  updateTeam(team:Team) {
    this.dialog.open(ModalTeamComponent, {
      disableClose:true,
      data: team
    }).afterClosed().subscribe(result => {
      if(result === "true") this.getTeams();
    });
  }

  deleteTeam(team:Team) {
    Swal.fire({
      title: '¿Usted desea eliminar este equipo?',
      text: team.name,
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, eliminar equipo",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.teamService.delete(team.id).subscribe({
          next:(data) => {
            if(data.status === 'OK') {
              this.utilityService.showAlert("El equipo fue eliminado", "Listo!");
              this.getTeams();
            }
            else {
              this.utilityService.showAlert("No se pudo eliminar el equipo", "Error!");
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  setStatusTeam(team:Team) {
    Swal.fire({
      title: '¿Usted desea inhabilitar este Equipo?',
      text: team.name,
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, inhabilitar equipo",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.teamService.updateSubscriptionById(team.id, false).subscribe({
          next:(data) => {
            if(data.status === 'OK') {
              this.utilityService.showAlert("El equipo fue deshabilitado", "Ready!");
              this.getTeams();
            }
            else {
              this.utilityService.showAlert("No se pudo deshabilitar el equipo", "Error!");
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.getTeams();
  }

  ngAfterViewInit(): void {
    this.dataTeamList.paginator = this.tablePagination;
  }

}
