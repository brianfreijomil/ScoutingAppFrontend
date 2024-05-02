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

  resultAction:boolean = false;
  columnsTableStats:string[] = ['registerDate','matches','minutes','scores','assists','yellowCards','redCards','actions'];
  columnsTableHistoryClinicc:string[] = ['registerDate','title','actions'];
  datainitHistoryClinic:any[] = [
    {
      registerDate: "01/02/2024",
      title: "Lesion de isquiotibial derecho (desgarro)",
      report: "lorem ipsum dolor sit amet, consectet ut labore et dolore magna aliqu sapiente vit"
    },
    {
      registerDate: "01/02/2024",
      title: "Lesion de isquiotibial derecho (desgarro)",
      report: "lorem ipsum dolor sit amet, consectet ut labore et dolore magna aliqu sapiente vit"
    },
    {
      registerDate: "01/02/2024",
      title: "Lesion de isquiotibial derecho (desgarro)",
      report: "lorem ipsum dolor sit amet, consectet ut labore et dolore magna aliqu sapiente vit"
    },
    {
      registerDate: "01/02/2024",
      title: "Lesion de isquiotibial derecho (desgarro)",
      report: "lorem ipsum dolor sit amet, consectet ut labore et dolore magna aliqu sapiente vit"
    },
    {
      registerDate: "01/02/2024",
      title: "Lesion de isquiotibial derecho (desgarro)",
      report: "lorem ipsum dolor sit amet, consectet ut labore et dolore magna aliqu sapiente vit"
    },
    {
      registerDate: "01/02/2024",
      title: "Lesion de isquiotibial derecho (desgarro)",
      report: "lorem ipsum dolor sit amet, consectet ut labore et dolore magna aliqu sapiente vit"
    }
  ];

  datainitStats:any[] = [
    {
      registerDate: "01/02/2024",
      matches: 1,
      minutes: 65,
      scores: 2,
      assists: 0,
      yellowCards: 1,
      redCards: 0
    },
    {
      registerDate: "08/02/2024",
      matches: 1,
      minutes: 45,
      scores: 1,
      assists: 1,
      yellowCards: 0,
      redCards: 0
    },
    {
      registerDate: "15/02/2024",
      matches: 1,
      minutes: 55,
      scores: 0,
      assists: 2,
      yellowCards: 1,
      redCards: 0
    },
    {
      registerDate: "22/02/2024",
      matches: 2,
      minutes: 88,
      scores: 1,
      assists: 0,
      yellowCards: 0,
      redCards: 0
    },
    {
      registerDate: "29/02/2024",
      matches: 2,
      minutes: 88,
      scores: 1,
      assists: 0,
      yellowCards: 0,
      redCards: 0
    },
    {
      registerDate: "06/03/2024",
      matches: 2,
      minutes: 88,
      scores: 1,
      assists: 0,
      yellowCards: 0,
      redCards: 0
    },
    {
      registerDate: "13/03/2024",
      matches: 2,
      minutes: 88,
      scores: 1,
      assists: 0,
      yellowCards: 0,
      redCards: 0
    }
  ];

  dataHistoryClinicPlayerList = new MatTableDataSource(this.datainitHistoryClinic);
  @ViewChild('paginatorHc', {static: false})tablePaginationCH!:MatPaginator;

  dataStatsPlayerList = new MatTableDataSource(this.datainitStats);
  @ViewChild('paginatorStats', {static: false})tablePaginationST!:MatPaginator;

  actionResult:boolean = false;
  playerSearched:string = 'brianfreijomil';

  constructor(
    private dialog: MatDialog, 
    private router:Router, 
    private routeActivated:ActivatedRoute) {

      this.playerSearched = String(this.routeActivated.snapshot.paramMap.get('id'));

  }

  updatePhotoPlayer() {
    this.dialog.open(ModalEditPhotoComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  updatePlayer(any:any) {
    this.dialog.open(ModalEditPlayerComponent, {
      disableClose:true,
      data: any
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  createStats() {
    this.dialog.open(ModalStatsComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  updateStats(any:any) {
    this.dialog.open(ModalStatsComponent, {
      disableClose:true,
      data: any
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  deleteStats(user:any) {
    Swal.fire({
      title: '¿Desea eliminar el registro de esta fecha?',
      text: "12/02/2024",
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, eliminar registro",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.resultAction = true;
        //logica
      }
    })
  }

  createHistoryClinic() {
    this.dialog.open(ModalClinicHistoryComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  updateHistoryClinic(any:any) {
    this.dialog.open(ModalClinicHistoryComponent, {
      disableClose:true,
      data: any
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  deleteHistoryClinic(any:any) {
    Swal.fire({
      title: '¿Desea eliminar este registro clinico?',
      text: "Lesion de isquiotibial...",
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, eliminar registro",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.resultAction = true;
        //logica
      }
    })
  }

  viewHistoryClinic(any:any) {
    console.log("funca")
    this.dialog.open(ModalViewClinicHistoryComponent, {
      disableClose:true,
      data: any
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  ngOnInit(): void {
    if(this.playerSearched != 'brianfreijomil') {
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit(): void {
    this.dataStatsPlayerList.paginator = this.tablePaginationST;
    this.dataHistoryClinicPlayerList.paginator = this.tablePaginationCH;
  }

}
