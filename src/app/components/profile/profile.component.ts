import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedModule } from '../reusable/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ModalEditPlayerComponent } from '../modales/modal-edit-player/modal-edit-player.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditPhotoComponent } from '../modales/modal-edit-photo/modal-edit-photo.component';
import { ModalStatsComponent } from '../modales/modal-stats/modal-stats.component';
import { ModalClinicHistoryComponent } from '../modales/modal-clinic-history/modal-clinic-history.component';
import { ModalViewClinicHistoryComponent } from '../modales/modal-view-clinic-history/modal-view-clinic-history.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HeaderComponent } from '../reusable/header/header.component';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';
import { Stat } from '../../interfaces/stat';
import { ClinicHistoryService } from '../../core/services/clinic-history.service';
import { StatsService } from '../../core/services/stats.service';
import { PlayerService } from '../../core/services/player.service';
import { Player } from '../../interfaces/player';
import { ClinicHistory } from '../../interfaces/clinic-history';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SharedModule, 
    ModalEditPlayerComponent, 
    LayoutComponent, 
    HeaderComponent,
    MenuPageComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit {

   columnsTableStats:string[] = 
  ['registerDate','matches','minutes','scores','assists','yellowCards','redCards','actions'];

  columnsTableHistoryClinicc:string[] = ['dateRegister','title','actions'];
  
  datainitHistoryClinic:ClinicHistory[] = [];
  datainitStats:Stat[] = [];

  dataHistoryClinicPlayerList = new MatTableDataSource(this.datainitHistoryClinic);
  @ViewChild('paginatorHc', {static: false})tablePaginationCH!:MatPaginator;

  dataStatsPlayerList = new MatTableDataSource(this.datainitStats);
  @ViewChild('paginatorStats', {static: false})tablePaginationST!:MatPaginator;

  playerSearched:string = '';

  playerProfile: Player | undefined;

  constructor(
    private dialog: MatDialog, 
    private router:Router, 
    private routeActivated:ActivatedRoute,
    private statsService:StatsService,
    private clinicHistoryService:ClinicHistoryService,
    private playerService:PlayerService,
  ) 
  {
      //get value of param, from path
      this.playerSearched = String(this.routeActivated.snapshot.paramMap.get('fullname'));

  }

  getFullName() {
    return `${this.playerProfile?.surname} ${this.playerProfile?.name}`.trim();
  }

  updatePhotoPlayer() {
    this.dialog.open(ModalEditPhotoComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result === 'true') {
        //do something...
      }
    });
  }

  updatePlayer() {
    this.dialog.open(ModalEditPlayerComponent, {
      disableClose:true,
      data: this.playerProfile
    }).afterClosed().subscribe(result => {
      if(result) {
        this.playerProfile = result;
      }
    });
  }

  createStats() {
    this.dialog.open(ModalStatsComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result) {
        this.dataStatsPlayerList.data.push(result);
      }
    });
  }

  updateStats(stat:Stat) {
    this.dialog.open(ModalStatsComponent, {
      disableClose:true,
      data: stat
    }).afterClosed().subscribe(result => {
      if(result) {
        this.dataStatsPlayerList.data = 
        this.dataStatsPlayerList.data.filter(c => c.id != stat.id);
        this.dataStatsPlayerList.data.push(result);
      }
    });
  }

  deleteStats(stat:Stat) {
    Swal.fire({
      title: '¿Desea eliminar el registro de esta fecha?',
      text: stat.dateRegister.getDate.name,
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, eliminar registro",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.statsService.delete(stat.id).subscribe({
          next: (data) => {
            if(data.status === 'OK') {
              this.dataStatsPlayerList.data = 
              this.dataStatsPlayerList.data.filter(c => c.id != stat.id);
            } 
            else {
              console.log(data.status);
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  createHistoryClinic() {
    this.dialog.open(ModalClinicHistoryComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result === 'true') {
        this.dataHistoryClinicPlayerList.data.push(result);
      }
    });
  }

  updateHistoryClinic(clinicHistory:ClinicHistory) {
    this.dialog.open(ModalClinicHistoryComponent, {
      disableClose:true,
      data: clinicHistory
    }).afterClosed().subscribe(result => {
      if(result === 'true') {
        this.dataHistoryClinicPlayerList.data = 
        this.dataHistoryClinicPlayerList.data.filter(c => c.id != clinicHistory.id);
        this.dataHistoryClinicPlayerList.data.push(result);
      }
    });
  }

  deleteHistoryClinic(clinicHistory:ClinicHistory) {
    Swal.fire({
      title: '¿Desea eliminar este registro clinico?',
      text: clinicHistory.title,
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, eliminar registro",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.clinicHistoryService.delete(clinicHistory.id).subscribe({
          next: (data) => {
            if(data.status === 'OK') {
              this.dataHistoryClinicPlayerList.data = 
              this.dataHistoryClinicPlayerList.data.filter(c => c.id != clinicHistory.id);
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  viewHistoryClinic(clinicReport:ClinicHistory) {
    this.dialog.open(ModalViewClinicHistoryComponent, {
      disableClose:true,
      data: clinicReport
    }).afterClosed().subscribe(result => {
      if(result === 'true') {
        //do something...
      }
    });
  }

  getPlayerByFullName(fullName:string) {
    this.playerService.getPlayerByCompleteName(fullName).subscribe({
      next: (data) => {
        if(data.status === 'OK') {
          this.playerProfile = data.body;
        }
        else if(data.status === 'BAD_REQUEST') {
          this.router.navigate(['']);
        }
        else {
          console.log(data.status);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getPlayerByFullName(this.playerSearched);
  }

  ngAfterViewInit(): void {
    this.dataStatsPlayerList.paginator = this.tablePaginationST;
    this.dataHistoryClinicPlayerList.paginator = this.tablePaginationCH;
  }

}
