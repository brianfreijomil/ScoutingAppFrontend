import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { MapComponent } from "../map/map.component";
import { UserComponent } from "../user/user.component";
import { PlayerComponent } from "../player-context/menu-player/player/player.component";

/*la ruta raiz es pages*/

export const LAYOUT_ROUTES : Routes = [
    { path: '', component: LayoutComponent, children: [
        {
            path: '**', 
            redirectTo: '', 
            pathMatch: 'full'
        }
    ]
    }
]