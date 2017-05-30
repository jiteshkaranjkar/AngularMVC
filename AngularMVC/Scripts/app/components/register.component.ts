import { Component, OnInit, Inject } from '@angular/core'
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, UserService } from '../services/index';
import { lookUpTokenList, lookUpTokens } from '../models/Providers';

@Component({
    templateUrl: 'Scripts/app/components/register.component.html'
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    init: OnInit;
    usrRegisterFrmGrp: FormGroup;

    constructor(private frmBldr: FormBuilder, private alertService: AlertService,
            private userService: UserService, private router: Router, @Inject(lookUpTokenList) public lookUpTokens) {
    }

    ngOnInit(): void {
        this.usrRegisterFrmGrp = this.frmBldr.group({
            Id: [''],
            FirstName: ['', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])],
            LastName: ['', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])],
            UserName: ['', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])],
            Gender: ['', Validators.required],
            DOB: ['', Validators.required],
            EmailId: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
            Password: ['']
        });
    }


    registerUser(formData: any) {
        this.loading = true;
        formData.Id = 0;
        this.userService.post('api/userapi/', formData).subscribe(
            data => {
                debugger;
                this.alertService.success('Registration successful', true);
                debugger;
                this.router.navigate(['home']);
            },
            error => {
                debugger;
                this.alertService.error(error);
                this.loading = false;
            });
    }
}