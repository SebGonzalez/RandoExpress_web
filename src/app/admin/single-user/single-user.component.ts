import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/person.service';
import {ActivatedRoute} from "@angular/router";

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
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.nom = this.userService.getUserId(+id).nom;
    this.prenom = this.userService.getUserId(+id).prenom;
    this.mail = this.userService.getUserId(+id).mail;
    this.password = this.userService.getUserId(+id).password;
  }

}
