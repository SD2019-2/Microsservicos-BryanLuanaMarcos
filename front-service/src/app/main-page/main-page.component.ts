import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { UserService } from '../services/user-service.service'
import { FriendService } from '../services/friend-service.service'
import { Friend } from '../models/friends.response.models'
import { Observable } from 'rxjs'
import { CreateUserRequest } from '../models/createUser.request.models'

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    providers: [FriendService, UserService]
})
export class MainPageComponent implements OnInit {
    userForm
    userFormSubmitted = false
    users: Friend[] = []
    usersObs: Observable<Friend[]>
    myName: string
    myAge: number

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private friendService: FriendService
    ) {
        this.userForm = this.formBuilder.group({
            name: '',
            age: ''
        })
    }

    ngOnInit() {
        this.users = [{ name: 'João', isFriend: true }]
    }

    createUser(userValues: CreateUserRequest) {
        if (this.userFormSubmitted) return
        this.userForm.disable()
        this.userFormSubmitted = true

        this.userService.saveUser(userValues).subscribe(response => {
            console.log(response)

            this.myName = userValues.name
            this.myAge = userValues.age

            this.usersObs = this.friendService.getFriends(userValues.name)
            this.usersObs.subscribe(response => {
                this.users = response
            })
        })
    }

    addFriend(friendName) {
        console.log(friendName)
        this.friendService
            .addFriend({
                myName: this.myName,
                otherName: friendName
            })
            .subscribe(response => {
                console.log(response)
                this.usersObs = this.friendService.getFriends(this.myName)
                this.usersObs.subscribe(response => {
                    this.users = response
                })
            })
    }
}
