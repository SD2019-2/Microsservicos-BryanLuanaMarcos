import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Friend } from '../models/friends.response.models'
import { AddFriendRequest } from '../models/addFriend.request.models'

const API_FRIENDS = environment.API_HOST + '/friends'

@Injectable({
    providedIn: 'root'
})
export class FriendServiceService {
    constructor(private http: HttpClient) {}

    public getFriends(name: string): Observable<Friend[]> {
        return this.http.get<Friend[]>(API_FRIENDS + `/${name}`)
    }

    public addFriend(body: AddFriendRequest): Observable<any> {
        return this.http.post<any>(API_FRIENDS, body)
    }
}
