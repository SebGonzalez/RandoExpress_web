import {Personne} from './personne.model';

export class Rando {
  constructor(public id: number,
              public name: string,
              public ville: string,
              public description: string,
              public latitude: string,
              public longitude: string,
              public heureDepart: string,
              public dateDepart: string
  ) {

  }
}
