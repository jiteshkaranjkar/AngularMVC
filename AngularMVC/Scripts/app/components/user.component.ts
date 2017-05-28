import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { IUser } from '../models/IUser';
import { UserService } from '../services/user.service';
import { DBOperation } from '../Shared/enums';

import { lookUpTokenList, lookUpTokens } from '../models/Providers';

@Component({
    templateUrl: 'Scripts/app/components/user.component.html'
})

export class UserComponent implements OnInit {
    //@ViewChild('modal') modal: ModalComponent;
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
            MiddleName: ['',],
            LastName: ['', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])],
            Gender: ['', Validators.required],
            DOB: ['', Validators.required],
            FatherId: [''],
            MotherId: [''],
            GaurdianId: ['']
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
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Add New User";
        this.usrFrmGrp.reset();
    }

    editUser(user: IUser) {
        this.toggoleShowHide = 1;
        this.SetControlState(true);
        this.operation = "Edit User";
        this.usrFrmGrp.setValue(user);
    }

    deleteUser(id: number) {
        this.SetControlState(false);
        this.user = this.users.filter(x => x.Id = id)[0];

    }

    onSubmit(formData: any) {
        this.msg = "";

        alert("onSubmit:" + formData.value);
        switch (this.dbOps) {
            case DBOperation.insert:
                alert("insert");
                this.userService.post('api/userapi/', formData.value).subscribe(
                    data => {
                        alert("Data");
                        if (data == 1) {
                            this.msg = "Data Successfully Added."
                            this.LoadUsers();
                        }
                        else {
                            alert("else");
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                    },
                    error => {
                        alert("error");
                        this.msg = error;
                    });
                break;
            case DBOperation.update:
                alert("update");
                this.userService.put('api/userapi/', formData.value.Id, formData.value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
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
                this.userService.delete('api/userapi/', formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
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
        }
    }

    SetControlState(isEnable: boolean) {
        isEnable ? this.usrFrmGrp.enable() : this.usrFrmGrp.disable();
    }
}