import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService, AlertService, AuthenticationService } from './services/index';


@Component({
    selector: 'my-app',
    templateUrl: 'Scripts/app/app.component.html'//,
    //styleUrls: ['Scripts/app/app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('closeBtn') closeBtn: ElementRef;
    model: any = {};
    loading = false;
    returnUrl: string;
    userLoginText: string = " Login";
    loginClass: string = "glyphicon glyphicon-log-in";
    toggoleShowHide: number = 0;

    loginFrmGrp: FormGroup;
    msg: string;
    indLoading: boolean = false;
    constructor(private frmBldr: FormBuilder, private userService: UserService, private route: ActivatedRoute,
        private router: Router, private authenticationService: AuthenticationService, private alertService: AlertService) { }

    ngOnInit(): void {
        // reset login status
        this.authenticationService.logout();

        this.loginFrmGrp = this.frmBldr.group({
            UserName: ['', Validators.required],
            UserPwd: ['', Validators.required]
        });
        //// get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    private LoginClick() {
        if (this.userLoginText == " Login") {
            this.userLoginText = " Login";
            this.loginClass = "glyphicon glyphicon-log-out";
            this.toggoleShowHide = 0;
        }
        else if (this.userLoginText == " Logout") {
            this.userLoginText = " Login"
            this.loginClass = "glyphicon glyphicon-log-in";
            this.toggoleShowHide = 1;
        }
    }

    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }
    resetControls() {
        this.loginFrmGrp.controls.reset;
        this.loginFrmGrp.reset();
    }

    onLogin(formData: any) {
        if (this.userLoginText == " Login") {
            this.loading = true;
            this.authenticationService.login('api/userapi', formData).subscribe(
                data => {
                    if (data != null) //Success  && data.Id != 0
                    {
                        this.msg = "Data successfully deleted.";
                    }
                    else {
                        this.msg = "There is some issue in saving records, please contact to system administrator!"
                    }
                    this.userLoginText = " Logout"
                    this.loginClass = "glyphicon glyphicon-log-out";
                    this.closeModal();
                    this.toggoleShowHide = 0
                },
                error => {
                    this.msg = error;
                }
            );
        }
        else if (this.userLoginText == " Logout") {
            this.userLoginText = " Login"
            this.loginClass = "glyphicon glyphicon-log-in";
            this.toggoleShowHide = 1;
        }

    }

}