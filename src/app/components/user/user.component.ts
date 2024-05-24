import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../reusable/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalUserComponent } from '../modales/modal-user/modal-user.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../reusable/header/header.component';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';
import { UserService } from '../../core/services/user.service';
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

  columnsUserTable:string[] = ['username','email','enabled','actions'];
  dataUserList = new MatTableDataSource<User>([])
  @ViewChild('paginatorUsers', {static: false})tablePagination!:MatPaginator;

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
              console.log(data.body)
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

  // getUserByUsername(user:User) {
  //   this.userService.getByUsername(user.username).subscribe({
  //     next: (data) => {
  //       if(data.status === 'OK') {
  //         console.log(data.body);
  //       }
  //       else {
  //         console.log(""+data.message+", "+ data.status);
  //       }
  //     },
  //     error:(err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  createUser() {
    this.dialog.open(ModalUserComponent, {
      disableClose:true
    }).afterClosed().subscribe(result => {
      if(result === 'true') {
        this.getUsers();
      }
    });
  }

  updateUser(user:User) {
    this.dialog.open(ModalUserComponent, {
      disableClose:true,
      data: user
    }).afterClosed().subscribe(result => {
      if(result === 'true') this.getUsers();
    });
  }

  deleteUser(user:User) {
    Swal.fire({
      title: '¿Usted desea eliminar este usuario?',
      text: user.username,
      icon: "warning",
      confirmButtonColor: '#313030',
      confirmButtonText: "Si, eliminar usuario",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.userService.delete(user.id).subscribe({
          next:(data) => {
            if(data.status === 'OK') {
              this.utilityService.showAlert("El usuario fue eliminado", "Listo!");
              this.getUsers();
            }
            else {
              this.utilityService.showAlert("No se pudo eliminar el usuario", "Error!");
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  setStatusUser(user:User) {
    // Swal.fire({
    //   title: '¿Usted desea inhabilitar este usuario?',
    //   text: user.username,
    //   icon: "warning",
    //   confirmButtonColor: '#313030',
    //   confirmButtonText: "Si, inhabilitar usuario",
    //   showCancelButton: true,
    //   cancelButtonColor: '#d33',
    //   cancelButtonText: "No, cancelar"
    // }).then((result) => {
    //   if(result.isConfirmed) {
    //     this.userService.updateStatusUser(user.id).subscribe({
    //       next:(data) => {
    //         if(data.status === 'OK') {
    //           this.utilityService.showAlert("El usuario fue inhabilitado", "Listo!");
    //           this.getUsers();
    //         }
    //         else {
    //           this.utilityService.showAlert("No se pudo inhabilitar el usuario", "Error!");
    //         }
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       }
    //     });
    //   }
    // })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataUserList.paginator = this.tablePagination;
  }

}
