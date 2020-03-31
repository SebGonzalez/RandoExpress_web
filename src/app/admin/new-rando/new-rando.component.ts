/**
 * @memberof app
 * @ngdoc new-rando
 * @name ListRandoComponent
 * @param {FormBuilder} formBuilder
 * @param {RandosService} randoService
 * @param {ActivatedRoute} route
 * @param {Router} router
 * @param {PersonsService} personsService
 * @description
 *    Notre component permet de gérer le formulaire de création d'une randonnée .
 */


import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RandosService} from '../../services/randos.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Rando} from '../../models/rando.model';
import {Subscription} from 'rxjs';
import {Personne} from '../../models/personne.model';
import {PersonsService} from '../../services/person.service';

@Component({
  selector: 'app-new-rando',
  templateUrl: './new-rando.component.html',
  styleUrls: ['./new-rando.component.css']
})
export class NewRandoComponent implements OnInit, OnDestroy {

  randoForm: FormGroup;
  id: number;
  userEdit: Personne;
  randoEdit: Rando;
  users: Personne[];
  userSubcription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private randoService: RandosService,
              private route: ActivatedRoute,
              private router: Router,
              private personsService: PersonsService) {
  }

  /**
   * @memberof NewRandoComponent
   * @description
   * Initialisation d'une randonnée ou récupération de celle-ci.
   */
  ngOnInit() {
    this.userSubcription = this.personsService.userSubject.subscribe(
      (users: Personne[]) => {
        this.users = users;
      }
    );
    this.personsService.emitUser();
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.randoEdit = this.randoService.getRandoById(+this.id);
    } else {
      this.randoEdit = new Rando(-1, '', '', '', '',
        '', '', '', null, null);
    }
    this.initForm();
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }

  /**
   * @memberof NewRandoComponent
   * @description
   * Récupération informations formulaire.
   */
  initForm() {
    this.randoForm = this.formBuilder.group({
        name: [this.randoEdit.name],
        ville: [this.randoEdit.ville],
        description: [this.randoEdit.description],
        latitude: [this.randoEdit.latitude],
        longitude: [this.randoEdit.longitude],
        heureDepart: [this.randoEdit.heureDepart],
        dateDepart: [this.randoEdit.dateDepart],
        users: [this.randoEdit.owner],
      }
    );
  }

  /**
   * @memberof NewRandoComponent
   * @returns {router}
   * @description
   * Création d'une randonnée ou edition d'une existante.
   */
  onSubmitForm() {
    const formValue = this.randoForm.value;

    this.userEdit = this.personsService.getUserById(+formValue.users);
    formValue.users = this.userEdit;
    if (this.randoEdit.id === -1) {
      const NewRando = new Rando(
        formValue.id = this.randoService.randonne[this.randoService.randonne.length - 1].id + 1,
        formValue.name,
        formValue.ville,
        formValue.description,
        formValue.latitude,
        formValue.longitude,
        formValue.heureDepart,
        formValue.dateDepart,
        formValue.users, []
      );
      this.randoService.addRando(NewRando).then(
        () => {
          this.router.navigate(['/list-rando']);
        }
      );

    } else {
      console.log('Le user : ');
      console.log(formValue.users);
      if (!formValue.users) {
        formValue.users = this.randoEdit.owner;
      }
      this.randoService.updateRando(this.id, formValue.name, formValue.ville,
        formValue.description, formValue.latitude, formValue.longitude,
        formValue.heureDepart, formValue.dateDepart, formValue.users, this.randoEdit.persons).then(
        () => {
          this.router.navigate(['/list-rando']);
        }
      );

    }
  }
}
