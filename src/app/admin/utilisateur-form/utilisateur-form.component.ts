import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import * as rxjs from 'rxjs';
import {PersonsService} from '../../services/person.service';



@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.css']
})
export class UtilisateurFormComponent implements OnInit {

    defaultPrenom = 'Gerard';
  constructor(private personsService: PersonsService,
              private router: Router) { }

  ngOnInit() {
  }

  /**
   * @memberof UtilisateurFormComponent
   * @param {NgForm} form
   * @returns {router}
   */
  onSubmit(form: NgForm) {
    const nom = form.value.nom;
    const prenom = form.value.prenom;
    const mail = form.value.mail;
    const password = form.value.password;
   /* this.userService.addPersonne(nom, prenom, mail, password);*/
    this.router.navigate(['/list']);
  }

}
