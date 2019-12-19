import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Friend } from '../models/friends.response.models'
import { AddFriendRequest } from '../models/addFriend.request.models'

@Injectable({
    providedIn: 'root'
})
export class FriendService {
    constructor(private http: HttpClient) {}

    public getFriends(name: string): Observable<Friend[]> {
        return this.http.get<Friend[]>(environment.API_FRIENDS + `/${name}`)
    }

    public addFriend(body: AddFriendRequest): Observable<any> {
        console.log(body)
        return this.http.post<any>(environment.API_FRIENDS, body, {
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
