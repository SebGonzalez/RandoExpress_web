/**
 * @memberof app
 * @ngdoc person.service
 * @name PersonsService
 * @param {HttpClient} httpClient
 * @param {Router} router
 * @param {UserService} userService
 * @description
 *    Notre service sert à gérer l'ajout, la modification et la suppression d'utilisateur'.
 */



import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Personne} from '../models/personne.model';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Subject} from 'rxjs';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {UserService} from './user.service';
import {Rando} from '../models/rando.model';

@Injectable({
  providedIn: 'root'
})

export class PersonsService {
  users: Personne[] = [];
  userSubject = new Subject<Personne[]>();

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {
    this.getPersonsFromBack();
  }

  /**
   * @memberof PersonsService
   * @description
   * Récupération de toutes les données de L'API
   */

  getPersonsFromBack() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.userService.jwt
      })
    };

    console.log('Lecture des ref :');
    this.httpClient
      .get<Personne[]>('http://localhost:4200/RandoExpress_API/ws/rest/personnes', httpOptions)
      .subscribe(
        (response) => {
          this.users = response;
          this.emitUser();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  /**
   * @memberof PersonsService
   * @description
   * Emition d'une randonnée.
   */

  emitUser() {
    this.userSubject.next(this.users.slice());
  }
  /**
   * @memberof PersonsService
   * @params {number} id
   * @returns Observable
   * @description
   * Récupération d'un utilisateur à l'aide de son ID.
   */
  getUserById(id: number) {
    for ( const u of this.users) {
      // tslint:disable-next-line:triple-equals
      if (u.id == id) {
        return u;
      }
    }
  }
  /**
   * @memberof PersonsService
   * @param {Personne} user
   * @returns Observable
   * @description
   * Ajouter un utilisateur.
   */
  addPersonne(user: Personne) {
    this.users.push(user);
    this.emitUser();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // tslint:disable-next-line:max-line-length
    const body = '{ "id" : "' + user.id + '", "name" : "' + user.name + '", "firstName" : "' + user.firstName + '", "mail" : "' + user.mail + '", "password" : "' + user.password + '"}';
    return new Promise(
      (resolve, reject) => {
          const url  = 'http://localhost:4200/RandoExpress_API/ws/rest/personne';
          this.httpClient
            .post(url, body, httpOptions)
            .subscribe(
              (response) => {
                  resolve();
              },
              (error) => {
                console.log('Erreur ! : ' + error);
              }
            );

      }
    );
  }
  /**
   * @memberof PersonsService
   * @param {number} id
   * @param {string} name
   * @param {string} firstName
   * @param {string} mail
   * @param {string} password
   * @returns Observable
   * @description
   *  Edition d'un utilisateur.
   */
  updatePersonne(id: number, name: string, firstName: string, mail: string, password: string) {
    const user = new Personne(id, name, firstName, mail, password);

    console.log('ID : ' + id);
    const newUser = new Personne(id, name, firstName, mail, password);
    const r = this.getUserById(+newUser.id);
    const index = this.users.indexOf(r);
    this.users[index] = newUser;
    this.emitUser();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.userService.jwt
      })
    };
    // tslint:disable-next-line:max-line-length
    const body = '{ "id" : "' + user.id + '", "name" : "' + user.name + '", "firstName" : "' + user.firstName + '", "mail" : "' + user.mail + '", "password" : "' + user.password + '"}';
    return new Promise(
      (resolve, reject) => {
        const url  = 'http://localhost:4200/RandoExpress_API/ws/rest/personne';
        this.httpClient
          .put(url, body, httpOptions)
          .subscribe(
            (response) => {
              resolve();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );

      }
    );
  }
  /**
   * @memberof PersonsService
   * @param {number} id
   * @returns Observable
   * @description
   * Suppression d'un utilisateur.
   */
  deletePersonne(id: number) {
    const tmp = this.getUserById(id);
    const index = this.users.indexOf(tmp);
    delete this.users[index];
    this.emitUser();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.userService.jwt
      })
    };
    // tslint:disable-next-line:max-line-length
    return new Promise(
      (resolve, reject) => {
        const url  = 'http://localhost:4200/RandoExpress_API/ws/rest/personne/' + id;
        this.httpClient
          .delete(url, httpOptions)
          .subscribe(
            (response) => {
              resolve();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );

      }
    );
  }
}
