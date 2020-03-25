import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Personne} from '../../models/personne.model';
import {UserService} from '../../services/person.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {

  users: Personne[];
  userSubcription: Subscription;
  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSubcription = this.userService.userSubject.subscribe(
      (users: Personne[]) => {
        this.users = users;
      }
    );
    this.userService.emitUser();
  }
  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }

}
