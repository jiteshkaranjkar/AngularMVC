"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var user_component_1 = require("./components/user.component");
var home_component_1 = require("./components/home.component");
var schedule_component_1 = require("./components/schedule.component");
var parenting_component_1 = require("./components/parenting.component");
var policies_component_1 = require("./components/policies.component");
var gallery_component_1 = require("./components/gallery.component");
var programs_component_1 = require("./components/programs.component");
var events_component_1 = require("./components/events.component");
var about_component_1 = require("./components/about.component");
var contactus_component_1 = require("./components/contactus.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'schedule', component: schedule_component_1.ScheduleComponent },
    { path: 'parenting', component: parenting_component_1.ParentingComponent },
    { path: 'policies', component: policies_component_1.PoliciesComponent },
    { path: 'gallery', component: gallery_component_1.GalleryComponent },
    { path: 'programs', component: programs_component_1.ProgramsComponent },
    { path: 'Events', component: events_component_1.EventsComponent },
    { path: 'About', component: about_component_1.AboutComponent },
    { path: 'ContactUs', component: contactus_component_1.ContactUsComponent }
];
exports.Routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map