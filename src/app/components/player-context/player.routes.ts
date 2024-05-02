import { Routes } from "@angular/router";
import { MenuPlayerComponent } from "./menu-player/menu-player.component";
import { AddPlayerComponent } from "./add-player/add-player.component";
import { SearchPlayerComponent } from "./search-player/search-player.component";

/*la ruta raiz es pages*/

export const PLAYER_ROUTES : Routes = [
    {
        path: '',
        component: MenuPlayerComponent
    },
    {
        path: 'catchment',
        component: AddPlayerComponent
    },
    {
        path: 'search',
        component: SearchPlayerComponent
    },
    {
        path: '**',
        redirectTo: '', pathMatch: 'full'
    }
];