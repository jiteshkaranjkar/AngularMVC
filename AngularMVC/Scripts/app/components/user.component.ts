import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../models/IUser';
import { UserService } from '../services/user.service';
import { DBOperation } from '../Shared/enums';

import { lookUpTokenList, lookUpTokens } from '../models/Providers';

@Component({
    templateUrl: 'Scripts/app/components/user.component.html'
})

export class UserComponent implements OnInit {

    init: OnInit;
    user: IUser;
    users: IUser[];
    usrFrmGrp: FormGroup;
    msg: string;
    indLoading: boolean = false;
    toggoleShowHide: number = 0;
    operation: string;
    dbOps: DBOperation;

    constructor(private frmBldr: FormBuilder, private userService: UserService, @Inject(lookUpTokenList) public lookUpTokens) { }

    ngOnInit(): void {
        this.usrFrmGrp = this.frmBldr.group({
            Id: [''],
            FirstName: ['', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])],
            LastName: ['', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])],
            Gender: ['', Validators.required],
            DOB: ['', Validators.required],
            EmailId: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
            Password: ['']
        });
        this.LoadUsers();
    }

    yearValidator(control) {
        if (control.value.length == 0) {
            return null;
        }
        let year = control.value.getFullYear();
        let minYear = 1920;
        let maxYear = 2017;
        if (year >= minYear && year <= maxYear) {
            return control.value.toDateString();
        }
        else
            return { 'DOB': { min: minYear, max: maxYear } };
    }

    LoadUsers(): void {
        this.indLoading = true;
        this.userService.get('api/userapi/').
            subscribe(users => { this.users = users; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addUser() {
        this.dbOps = DBOperation.insert;
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Add New User";
        this.usrFrmGrp.reset();
    }

    editUser(user: IUser) {
        this.dbOps = DBOperation.update;
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Edit User";
        this.usrFrmGrp.setValue(user);
    }

    deleteUser(id: number, user: IUser) {
        alert(id);
        this.toggoleShowHide = 0;
        this.dbOps = DBOperation.delete;
        this.SetControlState(false);
        this.user = this.users.filter(x => x.Id = user.Id)[0];
        this.usrFrmGrp.setValue(user);
        debugger;
        this.userService.delete('api/userapi/', user.Id).subscribe(
            data => {
                if (data != null && data.Id != 0) //Success
                {
                    this.msg = "Data successfully deleted.";
                    this.toggoleShowHide = 0;
                    this.LoadUsers();
                }
                else {
                    this.msg = "There is some issue in saving records, please contact to system administrator!"
                }
            },
            error => {
                this.msg = error;
            }
        );
    }

    onSubmit(formData: any) {
        this.msg = "";
        switch (this.dbOps) {
            case DBOperation.insert:
                formData.Id = 0;
                formData.FatherId = 0;
                formData.MotherId = 0;
                formData.GaurdianId = 0;
                this.userService.post('api/userapi/', formData).subscribe(
                    data => {
                        if (data != null && data.Id != 0) //Success
                        {
                            this.msg = "Data Successfully Added."
                            this.toggoleShowHide = 0;
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.msg = error;
                    });
                break;
            case DBOperation.update:
                this.userService.put('api/userapi/', formData.value.Id, formData.value).subscribe(
                    data => {
                        if (data != null && data.Id != 0) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.toggoleShowHide = 0;
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.msg = error;
                    }
                );
            case DBOperation.delete:
                alert("delete");
                  this.userService.delete('api/userapi/', formData.value.Id).subscribe(
                    data => {
                        if (data != null && data.Id != 0) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.toggoleShowHide = 0;
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            default:
                alert("default");
                break;
        }
    }

    SetControlState(isEnable: boolean) {
        isEnable ? this.usrFrmGrp.enable() : this.usrFrmGrp.disable();
    }
}