import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../reusable/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalUserComponent } from '../modales/modal-user/modal-user.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../reusable/header/header.component';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule, ModalUserComponent, HeaderComponent, MenuPageComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, AfterViewInit {

  columnsTable:string[] = ['username','password','roleDescription','actions'];
  datainit:any[] = [
    {
      username: "brianFreijomil",
      password: "12345",
      roleDescription: "Administrator"
    },
    {
      username: "pepeMujica",
      password: "12345",
      roleDescription: "captador"
    },
    {
      username: "JoseSanMartin",
      password: "12345",
      roleDescription: "captador"
    },
    {
      username: "joseJosema",
      password: "12345",
      roleDescription: "captador"
    },
    {
      username: "lioMessi",
      password: "12345",
      roleDescription: "captador"
    },
    {
      username: "pepeFreijomil",
      password: "12345",
      roleDescription: "Administrator"
    },
    {
      username: "pepeGonzales",
      password: "12345",
      roleDescription: "captador"
    },
    {
      username: "juanFreijomil",
      password: "12345",
      roleDescription: "captador"
    },
    {
      username: "marceloAgachate",
      password: "12345",
      roleDescription: "captador"
    },
    {
      username: "pabloAimar",
      password: "12345",
      roleDescription: "captador"
    }
  ];
  dataUserList = new MatTableDataSource(this.datainit);
  @ViewChild(MatPaginator)tablePagination!:MatPaginator;
  resultAction:boolean = false;

  constructor(private dialog: MatDialog) {

  }

  createUser() {
    this.dialog.open(ModalUserComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  updateUser(any:any) {
    this.dialog.open(ModalUserComponent, {
      disableClose:true,
      data: any
    }).afterClosed().subscribe(result => {
      if(result == "true") this.resultAction = true;
    });
  }

  deleteUser(user:any) {
    Swal.fire({
      title: '¿Usted desea eliminar este usuario?',
      text: "pepeMujica",
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, eliminar usuario",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.resultAction = true;
        // this.userService.delete(user.idUser).subscribe({
        //   next:(data) => {
        //     if(data.status) {
        //       this.utilityService.showAlert("The user was deleted", "Ready!");
        //       this.getUsers();
        //     }
        //     else {
        //       this.utilityService.showAlert("Could not delete user", "Error!");
        //     }
        //   },
        //   error: (err) => {}
        // })
      }
    })
  }

  setStatusUser(user:any) {
    Swal.fire({
      title: '¿Usted desea inhabilitar este usuario?',
      text: "brianFreijomil",
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, inhabilitar usuario",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.resultAction = true;
        //logica de inhabilitacion/habilitacion de usuario
      }
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataUserList.paginator = this.tablePagination;
  }

}
