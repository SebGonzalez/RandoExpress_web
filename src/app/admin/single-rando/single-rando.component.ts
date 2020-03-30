/**
 * @memberof app
 * @ngdoc single-rando
 * @name SingleRandoComponent
 * @param {RandosService} userService
 * @param {ActivatedRoute} route
 * @description
 *    Notre component permet d'afficher tous les éléments d'une randonnée que nous avons choisi préalablement.
 */

import { Component, OnInit } from '@angular/core';
import {RandosService} from '../../services/randos.service';
import {ActivatedRoute} from '@angular/router';
import {PersonsService} from '../../services/person.service';
import {Personne} from '../../models/personne.model';

@Component({
  selector: 'app-single-rando',
  templateUrl: './single-rando.component.html',
  styleUrls: ['./single-rando.component.css']
})
export class SingleRandoComponent implements OnInit {
  nomP = 'NomP';
  ownerName = 'ownerName';
  ownerFirstName = 'ownerFirstName';
  nom = 'nom';
  ville = 'prenom';
  description = 'description';
  dateDepart = 'dateDepart';
  heureDepart = 'heureDepart';
  longitude = 'longitude';
  lattitude = 'lattitude';

  constructor(private userService: RandosService,
              private route: ActivatedRoute) { }
  /**
   * @memberof SingleRandoComponent
   * @description
   * Récupération des informations  d'une randonnée pour affichage.
   */
  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const rando = this.userService.getRandoById(+id);
    // @ts-ignore
    this.ownerName = rando.owner.name;
    this.ownerFirstName = rando.owner.firstName;
    this.nom = rando.name;
    this.ville = rando.ville;
    this.description = rando.description;
    this.dateDepart = rando.dateDepart;
    this.heureDepart = rando.heureDepart;
    this.longitude = rando.longitude;
    this.lattitude = rando.latitude;
  }

}
