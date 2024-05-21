import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _snackBar:MatSnackBar) { }

  showAlert(mesagge:string, type:string) {
    this._snackBar.open(mesagge,type, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }
  
}
