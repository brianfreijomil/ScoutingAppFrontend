import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../reusable/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalUserComponent } from '../modales/modal-user/modal-user.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../reusable/header/header.component';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';
import { UserService } from '../../core/services/user.service';
import { HttpStatusCode } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { UtilityService } from '../../core/services/utility.service';
import { KeycloakService } from '../../core/services/keycloak/keycloak.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule, ModalUserComponent, HeaderComponent, MenuPageComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, AfterViewInit {

  columnsTable:string[] = ['username','email','enabled','actions'];
  datainit:User[] = [];
  dataUserList = new MatTableDataSource(this.datainit);
  @ViewChild(MatPaginator)tablePagination!:MatPaginator;
  resultAction:boolean = false;


  constructor(
    private dialog: MatDialog, 
    private userService: UserService,
    private utilityService: UtilityService,
    private keycloakService: KeycloakService
  ) {

  }

  getUsers() {
    const userAttributes = this.keycloakService.profile?.attributes;
    if (userAttributes && userAttributes['team_id'] && Array.isArray(userAttributes['team_id'])) {
      const teamId = userAttributes['team_id'][0];
      if(teamId == 0) {
        this.userService.getAllUsers(this.keycloakService.profile?.id!).subscribe({
          next:(data) => {
            if(data.status === 'OK') {
              this.dataUserList = data.body;
            }
            else
              console.log("No error but No data");
          },
          error:(err) => {
            console.log(err);
          }
        });
      }
      else {
        this.userService.getAllByTeamId(teamId).subscribe({
          next:(data) => {
            if(data.status === 'OK') {
              this.dataUserList = data.body;
            }
            else
              console.log("No error but No data");
          },
          error:(err) => {
            console.log(err);
          }
        });
      }
    }
  }

  getUserByUsername() {
    this.userService.getByUsername('pepe').subscribe({
      next: (data) => {
        if(data.status === 'OK') {
          console.log(data.body);
        }
        else {
          console.log(""+data.message+", "+ data.status);
        }
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  createUser() {
    this.dialog.open(ModalUserComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result === "true") {
        this.getUsers();
      }
    });
  }

  updateUser(user:User) {
    this.dialog.open(ModalUserComponent, {
      disableClose:true,
      data: user
    }).afterClosed().subscribe(result => {
      if(result === "true") {
        this.getUsers();
      }
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
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataUserList.paginator = this.tablePagination;
  }

}
