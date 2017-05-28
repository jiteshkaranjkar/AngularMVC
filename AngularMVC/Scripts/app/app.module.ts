import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component.js';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { UserComponent } from './components/user.component';
import { ScheduleComponent } from './components/schedule.component';
import { ParentingComponent } from './components/parenting.component';
import { PoliciesComponent } from './components/policies.component';
import { GalleryComponent } from './components/gallery.component';
import { ProgramsComponent } from './components/programs.component';
import { EventsComponent } from './components/events.component';
import { AboutComponent } from './components/about.component';
import { ContactUsComponent } from './components/contactus.component';
import { UserService } from './services/user.service';

import { lookUpTokenList, lookUpTokens } from './models/Providers';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, Routing],
    declarations: [AppComponent, UserComponent, HomeComponent, ScheduleComponent, ParentingComponent,
                    PoliciesComponent, GalleryComponent, ProgramsComponent, EventsComponent, AboutComponent, ContactUsComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService,
        { provide: lookUpTokenList, useValue: lookUpTokens }],
    bootstrap: [AppComponent]
})

export class AppModule {}