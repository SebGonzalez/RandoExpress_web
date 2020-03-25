import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Personne} from '../../models/personne.model';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {PersonsService} from '../../services/person.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {

  users: Personne[];
  userSubcription: Subscription;
<<<<<<< HEAD
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }
=======
  constructor(private personsService: PersonsService,
              private route: ActivatedRoute) { }
>>>>>>> d74ddbef5b5dd40c5479d96d7b5ef3b9198c01d4

  ngOnInit() {
    this.userSubcription = this.personsService.userSubject.subscribe(
      (users: Personne[]) => {
        this.users = users;
      }
    );
    this.personsService.emitUser();
  }
  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }


  onEditUser(id: number) {
    this.router.navigate(['/list', 'edit', id]);
  }

}
