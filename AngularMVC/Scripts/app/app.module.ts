import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component.js';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routing } from './app.routing';
import { HomeComponent, UserComponent, ProfileComponent, GalleryComponent, ProgramsComponent } from './components/index';
import { PorfolioStocksComponent, AboutComponent, ContactUsComponent, RegisterComponent } from './components/index';
import { AlertComponent } from './shared/alert.component';
import { UserService, StockService, AlertService, AuthenticationService } from './services/index';

import { lookUpTokenList, lookUpTokens } from './models/Providers';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, Routing],
    declarations: [AppComponent, UserComponent, HomeComponent, ProfileComponent, GalleryComponent,
        ProgramsComponent, PorfolioStocksComponent, AboutComponent, ContactUsComponent, RegisterComponent, AlertComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService, StockService, AlertService, AuthenticationService,
        { provide: lookUpTokenList, useValue: lookUpTokens }],
    bootstrap: [AppComponent]
})

export class AppModule {}