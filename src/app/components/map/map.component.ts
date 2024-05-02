import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../reusable/shared.module';
import { HeaderComponent } from '../reusable/header/header.component';
import { MenuPageComponent } from '../reusable/menu-page/menu-page.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [SharedModule, HeaderComponent, MenuPageComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit {

  columnsTable:string[] = ['filtro','captados','fichados','captadores'];
  datainit:any[] = [
    {
      filtro: "Buenos Aires",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Mendoza",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Capital Federal",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Santa Fe",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Cordoba",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Catamarca",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Chaco",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
  ];

  dataProvincia:any[] = [
    {
      filtro: "Tandil",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "La Matanza",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Rauch",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Chivilcoy",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Mar del Plata",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Ayacucho",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Loberia",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
  ];

  dataCapital:any[] = [
    {
      filtro: "La Paternal",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Liniers",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "La Boca",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Belgrano",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Mataderos",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Recoleta",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
    {
      filtro: "Palermo",
      captados: 8,
      fichados: 4,
      captadores: 1
    },
  ];

  dataStatsList = new MatTableDataSource(this.datainit);
  @ViewChild(MatPaginator)tablePagination!:MatPaginator;

  currentStats:string = "Provincia";

  activeNavCountry:boolean = true;
  activeNavState:boolean = false;
  activeNavCapital:boolean = false;

  constructor(private dialog: MatDialog) {

  }

  viewStatsCountry() {
    this.dataStatsList = new MatTableDataSource(this.datainit);
    this.dataStatsList.paginator = this.tablePagination;
    this.currentStats = "Provincia";
    this.activeNavCountry = true;
    this.activeNavState = false;
    this.activeNavCapital = false;
  }

  viewStatsState() {
    this.dataStatsList = new MatTableDataSource(this.dataProvincia);
    this.dataStatsList.paginator = this.tablePagination;
    this.currentStats = "Municipio";
    this.activeNavCountry = false;
    this.activeNavState = true;
    this.activeNavCapital = false;
  }

  viewStatsCapital() {
    this.dataStatsList = new MatTableDataSource(this.dataCapital);
    this.dataStatsList.paginator = this.tablePagination;
    this.currentStats = "Barrio";
    this.activeNavCountry = false;
    this.activeNavState = false;
    this.activeNavCapital = true;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataStatsList.paginator = this.tablePagination;
  }


}
