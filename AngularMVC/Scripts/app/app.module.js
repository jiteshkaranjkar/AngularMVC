"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var app_component_js_1 = require("./app.component.js");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var index_1 = require("./components/index");
var index_2 = require("./components/index");
var alert_component_1 = require("./shared/alert.component");
var index_3 = require("./services/index");
var Providers_1 = require("./models/Providers");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.Routing],
        declarations: [app_component_js_1.AppComponent, index_1.UserComponent, index_1.HomeComponent, index_1.ProfileComponent, index_1.GalleryComponent,
            index_1.ProgramsComponent, index_2.PorfolioStocksComponent, index_2.AboutComponent, index_2.ContactUsComponent, index_2.RegisterComponent, alert_component_1.AlertComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, index_3.UserService, index_3.StockService, index_3.AlertService, index_3.AuthenticationService,
            { provide: Providers_1.lookUpTokenList, useValue: Providers_1.lookUpTokens }],
        bootstrap: [app_component_js_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map