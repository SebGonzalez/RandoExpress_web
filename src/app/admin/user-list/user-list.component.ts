import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Personne} from '../../models/personne.model';
import {PersonsService} from '../../services/person.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {

  users: Personne[];
  userSubcription: Subscription;

  constructor(private personsService: PersonsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

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
    this.router.navigate(['/new-user', id]);
  }

  onDeleteUser(users: Personne[], id: number) {
    this.personsService.deletePersonne(id).then(
      () => {
        this.router.navigate(['/list']);
      }
    );
  }

}
