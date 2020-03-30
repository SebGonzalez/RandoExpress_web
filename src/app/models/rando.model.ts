/**
 * @memberof app
 * @name Rando
 * @param {number} id
 * @param {string} name
 * @param {string} ville
 * @param {string} description
 * @param {string} latitude
 * @param {string} longitude
 * @param {string} heureDepart
 * @param {string} dateDepart
 * @param {Personne} owner
 * @param {Personne[]} persons
 * @description
 *    Permet de créer notre élement Rando.
 */

import {Personne} from './personne.model';

export class Rando {
  constructor(public id: number,
              public name: string,
              public ville: string,
              public description: string,
              public latitude: string,
              public longitude: string,
              public heureDepart: string,
              public dateDepart: string,
              public owner: Personne,
              public persons: Personne[]
  ) {

  }
}
