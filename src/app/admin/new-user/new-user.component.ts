/**
 * @memberof app
 * @ngdoc new-user
 * @name NewUserComponent
 * @param {FormBuilder} formBuilder
 * @param {ActivatedRoute} route
 * @param {Router} router
 * @param {PersonsService} personsService
 * @description
 *    Notre component permet de gérer le formulaire de création d'une personne .
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Personne} from '../../models/personne.model';
import {PersonsService} from '../../services/person.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  id: number;
  userEdit: Personne;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private personsService: PersonsService,
              private router: Router) {
  }
  /**
   * @memberof NewUserComponent
   * @description
   * Initialisation d'un utilisateur ou récupération de celui-ci.
   */
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log('this.id', this.id);
    if (this.id) {
      this.userEdit = this.personsService.getUserById(this.id);
      console.log('this.useredit', this.userEdit);
    } else {
      this.userEdit = new Personne(-1, '', '', '', '');
    }
    this.initForm();
  }

  /**
   * @memberof NewUserComponent
   * @description
   * Récupération informations formulaire.
   */

  initForm() {
    this.userForm = this.formBuilder.group({
        name: [this.userEdit.name, Validators.required],
        firstName: [this.userEdit.firstName, Validators.required],
        mail: [this.userEdit.mail, [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }

  /**
   * @memberof NewUserComponent
   * @returns {router}
   * @description
   * Création d'un utilisateur ou edition d'une existant.
   */

  onSubmitForm(id: number, name: string, firstName: string, mail: string, password: string) {
    const formValue = this.userForm.value;
    if (this.userEdit.id === -1) {

      const Newuser = new Personne(
        formValue.id = this.personsService.users[this.personsService.users.length - 1].id + 1,
        formValue.name,
        formValue.firstName,
        formValue.mail,
        formValue.password
      );

      this.personsService.addPersonne(Newuser).then(
        () => {
          this.router.navigate(['/list']);
        }
      );

    } else {
      this.personsService.updatePersonne(this.id, formValue.name, formValue.firstName,
        formValue.mail, formValue.password).then(
        () => {
          this.router.navigate(['/list']);
        }
      );
    }
  }
}
