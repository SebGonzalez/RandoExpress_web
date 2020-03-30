/**
 * @memberof app
 * @name Personne
 * @param {number} id
 * @param {string} name
 * @param {string} firstName
 * @param {string} mail
 * @param {string} password
 * @description
 *    Permet de créer notre élement Personne.
 */
export class Personne {
  constructor(public id: number,
              public name: string,
              public firstName: string,
              public mail: string,
              public password: string
  ) {
  }
}

