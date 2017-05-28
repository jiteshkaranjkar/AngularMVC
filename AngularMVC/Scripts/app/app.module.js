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
var home_component_1 = require("./components/home.component");
var user_component_1 = require("./components/user.component");
var schedule_component_1 = require("./components/schedule.component");
var parenting_component_1 = require("./components/parenting.component");
var policies_component_1 = require("./components/policies.component");
var gallery_component_1 = require("./components/gallery.component");
var programs_component_1 = require("./components/programs.component");
var events_component_1 = require("./components/events.component");
var about_component_1 = require("./components/about.component");
var contactus_component_1 = require("./components/contactus.component");
var user_service_1 = require("./services/user.service");
var Providers_1 = require("./models/Providers");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.Routing],
        declarations: [app_component_js_1.AppComponent, user_component_1.UserComponent, home_component_1.HomeComponent, schedule_component_1.ScheduleComponent, parenting_component_1.ParentingComponent,
            policies_component_1.PoliciesComponent, gallery_component_1.GalleryComponent, programs_component_1.ProgramsComponent, events_component_1.EventsComponent, about_component_1.AboutComponent, contactus_component_1.ContactUsComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, user_service_1.UserService,
            { provide: Providers_1.lookUpTokenList, useValue: Providers_1.lookUpTokens }],
        bootstrap: [app_component_js_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map