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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var index_1 = require("../services/index");
var Providers_1 = require("../models/Providers");
var RegisterComponent = (function () {
    function RegisterComponent(frmBldr, alertService, userService, router, lookUpTokens) {
        this.frmBldr = frmBldr;
        this.alertService = alertService;
        this.userService = userService;
        this.router = router;
        this.lookUpTokens = lookUpTokens;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.usrRegisterFrmGrp = this.frmBldr.group({
            Id: [''],
            FirstName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[\\w\\-\\s\\/]+')])],
            LastName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[\\w\\-\\s\\/]+')])],
            UserName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[\\w\\-\\s\\/]+')])],
            Gender: ['', forms_1.Validators.required],
            DOB: ['', forms_1.Validators.required],
            EmailId: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
            Password: ['']
        });
    };
    RegisterComponent.prototype.registerUser = function (formData) {
        var _this = this;
        this.loading = true;
        formData.Id = 0;
        this.userService.post('api/userapi/', formData).subscribe(function (data) {
            debugger;
            _this.alertService.success('Registration successful', true);
            debugger;
            _this.router.navigate(['home']);
        }, function (error) {
            debugger;
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        templateUrl: 'Scripts/app/components/register.component.html'
    }),
    __param(4, core_1.Inject(Providers_1.lookUpTokenList)),
    __metadata("design:paramtypes", [forms_1.FormBuilder, index_1.AlertService,
        index_1.UserService, router_1.Router, Object])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map