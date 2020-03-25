import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
<<<<<<< HEAD
import {Router} from '@angular/router';
import {Personne} from "../../models/personne.model";
=======
import {PersonsService} from '../../services/person.service';
>>>>>>> d74ddbef5b5dd40c5479d96d7b5ef3b9198c01d4

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
<<<<<<< HEAD
  nom: string = 'nom';
  prenom: string = 'prenom';
  mail: string = 'mail';
  password: string = 'password';

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }
=======

  nom: string;
  prenom: string;
  mail: string;
  password: string;

  constructor(private personsService: PersonsService,
              private route: ActivatedRoute) { }
>>>>>>> d74ddbef5b5dd40c5479d96d7b5ef3b9198c01d4

  ngOnInit() {
      const id = this.route.snapshot.params.id;
      this.nom = this.personsService.getUserById(+id).name;
      this.prenom = this.personsService.getUserById(+id).firstName;
      this.mail = this.personsService.getUserById(+id).mail;
      this.password = this.personsService.getUserById(+id).password;
  }
}
