import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user.component';
import { HomeComponent } from './components/home.component';
import { ProfileComponent } from './components/profile.component';
import { GalleryComponent } from './components/gallery.component';
import { ProgramsComponent } from './components/programs.component';
import { PorfolioStocksComponent } from './components/PorfolioStocks.component';
import { AboutComponent } from './components/about.component';
import { ContactUsComponent } from './components/contactus.component';
import { RegisterComponent } from './components/register.component';
import { AlertComponent } from './shared/alert.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'programs', component: ProgramsComponent },
    { path: 'porfolio', component: PorfolioStocksComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contactUs', component: ContactUsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'alert', component: AlertComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);