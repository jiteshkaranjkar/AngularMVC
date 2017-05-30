import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IUser } from '../models/IUser' ;

@Injectable()
export class UserService{
    userList: IUser[];

    constructor(private http: Http)
    { }

    get(url: string): Observable<any>
    {
        //return this.http.get(url)
        return this.http.get(url, this.jwt())
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any)
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url + id, body, this.jwt())
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    
    login(url: string, model: any) {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        debugger;
        console.log("http://localhost:64556/" + url + "/auth")
        return this.http.post(url + "/auth", body, this.jwt())//{ username: model.userId, password: model.userPwd }
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    post(url: string, model: any): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("http://localhost:64556/" + url + "/register")
        return this.http.post(url + "/register", body, this.jwt())
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.delete(url + id, this.jwt())
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private jwt()
    {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token)
        {
            let headers = new Headers({ 'Content-Type': 'application/json',  'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}