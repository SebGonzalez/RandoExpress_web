/**
 * @memberof app
 * @ngdoc single-user
 * @name SingleUserComponent
 * @param {PersonsService} personsService
 * @param {ActivatedRoute} route
 * @description
 *    Notre component permet d'afficher tous les éléments d'un utilisateur que nous avons choisi préalablement.
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {PersonsService} from '../../services/person.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  name: string;
  firstName: string;
  mail: string;
  password: string;

  constructor(private personsService: PersonsService,
              private route: ActivatedRoute) { }
  /**
   * @memberof SingleUserComponent
   * @description
   * Récupération des informations  d'un utilisateur pour affichage.
   */
  ngOnInit() {
      const id = this.route.snapshot.params.id;
      this.name = this.personsService.getUserById(+id).name;
      this.firstName = this.personsService.getUserById(+id).firstName;
      this.mail = this.personsService.getUserById(+id).mail;
      this.password = this.personsService.getUserById(+id).password;
  }
}
