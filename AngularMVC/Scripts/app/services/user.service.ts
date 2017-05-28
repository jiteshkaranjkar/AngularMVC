import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IUser } from '../models/IUser' ;

@Injectable()
export class UserService{

    constructor(private http: Http)
    { }

    get(url: string): Observable<any>
    {
        return this.http.get(url)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any)
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    post(url: string, model: any): Observable<any>
    {
        alert("insert Service");
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}