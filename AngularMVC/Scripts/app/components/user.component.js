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
var forms_1 = require("@angular/forms");
var user_service_1 = require("../services/user.service");
var enums_1 = require("../Shared/enums");
var Providers_1 = require("../models/Providers");
var UserComponent = (function () {
    function UserComponent(frmBldr, userService, lookUpTokens) {
        this.frmBldr = frmBldr;
        this.userService = userService;
        this.lookUpTokens = lookUpTokens;
        this.indLoading = false;
        this.toggoleShowHide = 0;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.usrFrmGrp = this.frmBldr.group({
            Id: [''],
            FirstName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[\\w\\-\\s\\/]+')])],
            LastName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[\\w\\-\\s\\/]+')])],
            Gender: ['', forms_1.Validators.required],
            DOB: ['', forms_1.Validators.required],
            EmailId: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
            Password: ['']
        });
        this.LoadUsers();
    };
    UserComponent.prototype.yearValidator = function (control) {
        if (control.value.length == 0) {
            return null;
        }
        var year = control.value.getFullYear();
        var minYear = 1920;
        var maxYear = 2017;
        if (year >= minYear && year <= maxYear) {
            return control.value.toDateString();
        }
        else
            return { 'DOB': { min: minYear, max: maxYear } };
    };
    UserComponent.prototype.LoadUsers = function () {
        var _this = this;
        this.indLoading = true;
        this.userService.get('api/userapi/').
            subscribe(function (users) { _this.users = users; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    UserComponent.prototype.addUser = function () {
        this.dbOps = enums_1.DBOperation.insert;
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Add New User";
        this.usrFrmGrp.reset();
    };
    UserComponent.prototype.editUser = function (user) {
        this.dbOps = enums_1.DBOperation.update;
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Edit User";
        this.usrFrmGrp.setValue(user);
    };
    UserComponent.prototype.deleteUser = function (id, user) {
        var _this = this;
        alert(id);
        this.toggoleShowHide = 0;
        this.dbOps = enums_1.DBOperation.delete;
        this.SetControlState(false);
        this.user = this.users.filter(function (x) { return x.Id = user.Id; })[0];
        this.usrFrmGrp.setValue(user);
        debugger;
        this.userService.delete('api/userapi/', user.Id).subscribe(function (data) {
            if (data != null && data.Id != 0) {
                _this.msg = "Data successfully deleted.";
                _this.toggoleShowHide = 0;
                _this.LoadUsers();
            }
            else {
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    UserComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbOps) {
            case enums_1.DBOperation.insert:
                formData.Id = 0;
                formData.FatherId = 0;
                formData.MotherId = 0;
                formData.GaurdianId = 0;
                this.userService.post('api/userapi/', formData).subscribe(function (data) {
                    if (data != null && data.Id != 0) {
                        _this.msg = "Data Successfully Added.";
                        _this.toggoleShowHide = 0;
                        _this.LoadUsers();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enums_1.DBOperation.update:
                this.userService.put('api/userapi/', formData.value.Id, formData.value).subscribe(function (data) {
                    if (data != null && data.Id != 0) {
                        _this.msg = "Data successfully updated.";
                        _this.toggoleShowHide = 0;
                        _this.LoadUsers();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                }, function (error) {
                    _this.msg = error;
                });
            case enums_1.DBOperation.delete:
                alert("delete");
                this.userService.delete('api/userapi/', formData.value.Id).subscribe(function (data) {
                    if (data != null && data.Id != 0) {
                        _this.msg = "Data successfully deleted.";
                        _this.toggoleShowHide = 0;
                        _this.LoadUsers();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            default:
                alert("default");
                break;
        }
    };
    UserComponent.prototype.SetControlState = function (isEnable) {
        isEnable ? this.usrFrmGrp.enable() : this.usrFrmGrp.disable();
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        templateUrl: 'Scripts/app/components/user.component.html'
    }),
    __param(2, core_1.Inject(Providers_1.lookUpTokenList)),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, Object])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map