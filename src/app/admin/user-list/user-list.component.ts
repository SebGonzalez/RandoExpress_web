import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Personne} from '../../models/personne.model';
import {PersonsService} from '../../services/person.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {

  users: Personne[];
  userSubcription: Subscription;

  constructor(private personsService: PersonsService,
              private route: ActivatedRoute) { }
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
    //this.route.navigate(['/list', 'edit', id]);
  }

}
