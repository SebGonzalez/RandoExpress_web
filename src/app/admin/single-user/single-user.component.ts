import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/person.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Personne} from "../../models/personne.model";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  nom: string = 'nom';
  prenom: string = 'prenom';
  mail: string = 'mail';
  password: string = 'password';

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
      const id = this.route.snapshot.params.id;
      this.nom = this.userService.getUserById(+id).nom;
      this.prenom = this.userService.getUserById(+id).prenom;
      this.mail = this.userService.getUserById(+id).mail;
      this.password = this.userService.getUserById(+id).password;
  }
}
