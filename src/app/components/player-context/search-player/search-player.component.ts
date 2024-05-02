import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../reusable/shared.module';
import { HeaderComponent } from '../../reusable/header/header.component';
import { MenuPageComponent } from '../../reusable/menu-page/menu-page.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-player',
  standalone: true,
  imports: [SharedModule,HeaderComponent,MenuPageComponent,RouterLink,CommonModule],
  templateUrl: './search-player.component.html',
  styleUrl: './search-player.component.css'
})
export class SearchPlayerComponent implements OnInit, AfterViewInit {

  columnsTablePlayersFound:string[] = ['nameComplete','category','status'];
  dataInit:any[] = [
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    },
    {
      surname: "Fernandez",
      name: "Fernando",
      category: "2016",
      status: "Fichado",
      scouter: "Fernando Palomo"
    }
  ];

  dataPlayersFoundList = new MatTableDataSource(this.dataInit);
  @ViewChild(MatPaginator)tablePagination!:MatPaginator;

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataPlayersFoundList.paginator = this.tablePagination;
  }

}
