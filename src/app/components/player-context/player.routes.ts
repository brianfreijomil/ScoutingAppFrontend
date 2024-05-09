import { Routes } from "@angular/router";
import { MenuPlayerComponent } from "./menu-player/menu-player.component";
import { AddPlayerComponent } from "./add-player/add-player.component";
import { SearchPlayerComponent } from "./search-player/search-player.component";
import { authGuard } from "../../core/guards/auth.guard";

/*la ruta raiz es pages*/

export const PLAYER_ROUTES : Routes = [
    {
        path: '',
        canActivate: [authGuard],
        component: MenuPlayerComponent
    },
    {
        path: 'catchment',
        canActivate: [authGuard],
        component: AddPlayerComponent
    },
    {
        path: 'search',
        canActivate: [authGuard],
        component: SearchPlayerComponent
    },
    {
        path: '**',
        canActivate: [authGuard],
        redirectTo: '', pathMatch: 'full'
    }
];