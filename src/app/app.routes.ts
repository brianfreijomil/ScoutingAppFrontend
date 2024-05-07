import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MapComponent } from './components/map/map.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
    },
    {
        path: 'home',
        component: LayoutComponent,
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UserComponent,
        pathMatch: 'full'
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        pathMatch: 'full'
    },
    {
        path: 'map',
        component: MapComponent,
        pathMatch: 'full'
    },
    {
        path: 'players',
        loadChildren: () => import("./components/player-context/player.routes").then(m => m.PLAYER_ROUTES)
    },
    {
        path: ':id/profile',
        component: ProfileComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '', pathMatch: 'full'
    }
];
