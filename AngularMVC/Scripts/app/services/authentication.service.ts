import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(url: string, model: any) {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url + "/authentication", body, options).
            map((response: Response) => {
                debugger;
                <any>response.json();
            })
                // login successful if there's a jwt token in the response
                //let user = response.json();
                //if (user && user.token)
                //    if (user && user.token) {
                //        // store user details and jwt token in local storage to keep user logged in between page refreshes
                //        localStorage.setItem('currentUser', JSON.stringify(user));
                //    }
                //})
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}