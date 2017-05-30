"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var index_1 = require("./services/index");
var AppComponent = (function () {
    function AppComponent(frmBldr, userService, route, router, authenticationService, alertService) {
        this.frmBldr = frmBldr;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.userLoginText = " Login";
        this.loginClass = "glyphicon glyphicon-log-in";
        this.toggoleShowHide = 0;
        this.indLoading = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        this.loginFrmGrp = this.frmBldr.group({
            UserName: ['', forms_1.Validators.required],
            UserPwd: ['', forms_1.Validators.required]
        });
        //// get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    AppComponent.prototype.LoginClick = function () {
        if (this.userLoginText == " Login") {
            this.userLoginText = " Login";
            this.loginClass = "glyphicon glyphicon-log-out";
            this.toggoleShowHide = 0;
        }
        else if (this.userLoginText == " Logout") {
            this.userLoginText = " Login";
            this.loginClass = "glyphicon glyphicon-log-in";
            this.toggoleShowHide = 1;
        }
    };
    AppComponent.prototype.closeModal = function () {
        this.closeBtn.nativeElement.click();
    };
    AppComponent.prototype.resetControls = function () {
        this.loginFrmGrp.controls.reset;
        this.loginFrmGrp.reset();
    };
    AppComponent.prototype.onLogin = function (formData) {
        var _this = this;
        if (this.userLoginText == " Login") {
            this.loading = true;
            this.authenticationService.login('api/userapi', formData).subscribe(function (data) {
                if (data != null) {
                    _this.msg = "Data successfully deleted.";
                }
                else {
                    _this.msg = "There is some issue in saving records, please contact to system administrator!";
                }
                _this.userLoginText = " Logout";
                _this.loginClass = "glyphicon glyphicon-log-out";
                _this.closeModal();
                _this.toggoleShowHide = 0;
            }, function (error) {
                _this.msg = error;
            });
        }
        else if (this.userLoginText == " Logout") {
            this.userLoginText = " Login";
            this.loginClass = "glyphicon glyphicon-log-in";
            this.toggoleShowHide = 1;
        }
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('closeBtn'),
    __metadata("design:type", core_1.ElementRef)
], AppComponent.prototype, "closeBtn", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'Scripts/app/app.component.html' //,
        //styleUrls: ['Scripts/app/app.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, index_1.UserService, router_1.ActivatedRoute,
        router_1.Router, index_1.AuthenticationService, index_1.AlertService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map