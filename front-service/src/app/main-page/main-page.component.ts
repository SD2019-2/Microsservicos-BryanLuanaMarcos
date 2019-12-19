import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { UserService } from '../services/user-service.service'
import { FriendService } from '../services/friend-service.service'
import { Friend } from '../models/friends.response.models'

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

    createUser(userValues) {
        if (this.userFormSubmitted) return
        this.userForm.disable()
        this.userFormSubmitted = true

        this.userService.saveUser(userValues).subscribe(response => {
            console.log(response)

            this.friendService
                .getFriends(userValues.name)
                .subscribe(response => {
                    this.users = response
                })
        })
    }

    updateUsers() {
        this.friendService
            .getFriends(this.userForm.name)
            .subscribe(response => {
                this.users = response
                setTimeout(this.updateUsers, 3000)
            })
    }

    addFriend(friendName) {
        this.friendService
            .addFriend({
                myName: this.userForm.name,
                otherName: friendName
            })
            .subscribe(response => {
                console.log(response)
            })
    }
}
