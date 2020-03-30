/**
 * @memberof app
 * @ngdoc user-list
 * @name UserListComponent
 * @param {PersonsService} personsService
 * @param {ActivatedRoute} route
 * @param {Router} router
 * @description
 *    Notre component permet d'afficher tous les élements que contient notre API concernant les utilisateurs.
 */

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

  /**
   * @memberof SingleRandoComponent
   * @description
   * Récupération des informations  des utilisateurs.
   */

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
  /**
   * @memberof UserListComponent
   * @param {number} id
   * @returns {router}
   * @description
   *  Edition d'un utilisateur
   */

  onEditUser(id: number) {
    this.router.navigate(['/new-user', id]);
  }
  /**
   * @memberof UserListComponent
   * @param {number} id
   * @param {Personne[]} users
   * @returns {router}
   * @description
   * Suppression d'un utilisateur
   */
  onDeleteUser(users: Personne[], id: number) {
    this.personsService.deletePersonne(id).then(
      () => {
        this.router.navigate(['/list']);
      }
    );
  }

}
