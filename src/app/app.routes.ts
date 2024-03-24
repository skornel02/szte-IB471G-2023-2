import { Routes } from '@angular/router';
import { MainPageComponent } from './routes/main-page/main-page.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { LogoutComponent } from './routes/logout/logout.component';
import { authenticatedGuard } from './helpers/authenticated.guard';
import { RoutersComponent } from './routes/routers/routers.component';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
    },
    {
        path: 'routers',
        component: RoutersComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [authenticatedGuard]
    },
];
