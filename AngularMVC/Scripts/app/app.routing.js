"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var user_component_1 = require("./components/user.component");
var home_component_1 = require("./components/home.component");
var profile_component_1 = require("./components/profile.component");
var gallery_component_1 = require("./components/gallery.component");
var programs_component_1 = require("./components/programs.component");
var PorfolioStocks_component_1 = require("./components/PorfolioStocks.component");
var about_component_1 = require("./components/about.component");
var contactus_component_1 = require("./components/contactus.component");
var register_component_1 = require("./components/register.component");
var alert_component_1 = require("./shared/alert.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'gallery', component: gallery_component_1.GalleryComponent },
    { path: 'programs', component: programs_component_1.ProgramsComponent },
    { path: 'porfolio', component: PorfolioStocks_component_1.PorfolioStocksComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'contactUs', component: contactus_component_1.ContactUsComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'alert', component: alert_component_1.AlertComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.Routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map