import {Personne} from './personne.model';

export class Rando {
  constructor(public id: number,
              public name: string,
              public description: string,
              public ville: string,
              public dateDepart: string,
              public heureDepart: string,
              public latitude: string,
              public longitude: string,
              public owner: Personne,
              public persons: Personne[]
  ) {

  }
}
