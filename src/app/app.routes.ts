import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MapComponent } from './components/map/map.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: AuthComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        canActivate: [authGuard],
        component: LayoutComponent,
        pathMatch: 'full'
    },
    {
        path: 'users',
        canActivate: [authGuard],
        component: UserComponent,
        pathMatch: 'full'
    },
    {
        path: 'calendar',
        canActivate: [authGuard],
        component: CalendarComponent,
        pathMatch: 'full'
    },
    {
        path: 'map',
        canActivate: [authGuard],
        component: MapComponent,
        pathMatch: 'full'
    },
    {
        path: 'players',
        canActivate: [authGuard],
        loadChildren: () => import("./components/player-context/player.routes").then(m => m.PLAYER_ROUTES)
    },
    {
        path: ':id/profile',
        canActivate: [authGuard],
        component: ProfileComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home', pathMatch: 'full'
    }
];
