import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path:"",
        component:LoginComponent
    },
    {
        path:"site-list",
        component:SiteListComponent
    },
    {
        path:"password-list",
        component:PasswordListComponent
    },
];
