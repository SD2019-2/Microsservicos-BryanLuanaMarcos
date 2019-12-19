import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { CreateUserRequest } from '../models/createUser.request.models'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    public saveUser(body: CreateUserRequest): Observable<any> {
        // this.http
        //     .post<any>(environment.API_USERS_DJ, body, {
        //         headers: { 'Content-Type': 'application/json' }
        //     })
        //     .subscribe(resp => {
        //         console.log(resp)
        //     })
        var sd = this.http.post<any>(environment.API_USERS, body, {
            headers: { 'Content-Type': 'application/json' }
        })
        sd.subscribe(resp => console.log(resp))
        return sd
    }
}
