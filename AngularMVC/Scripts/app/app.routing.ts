import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user.component';
import { HomeComponent } from './components/home.component';
import { ScheduleComponent } from './components/schedule.component';
import { ParentingComponent } from './components/parenting.component';
import { PoliciesComponent } from './components/policies.component';
import { GalleryComponent } from './components/gallery.component';
import { ProgramsComponent } from './components/programs.component';
import { EventsComponent } from './components/events.component';
import { AboutComponent } from './components/about.component';
import { ContactUsComponent } from './components/contactus.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'parenting', component: ParentingComponent },
    { path: 'policies', component: PoliciesComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'programs', component: ProgramsComponent },
    { path: 'Events', component: EventsComponent },
    { path: 'About', component: AboutComponent },
    { path: 'ContactUs', component: ContactUsComponent }
];

export const Routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);