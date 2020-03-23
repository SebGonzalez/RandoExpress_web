import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Personne} from '../models/personne.model';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TypeUser} from './personnes.service';
import * as firebase from "firebase";


@Injectable({
  providedIn: 'root'
})

export class UserService implements CanActivate {

  typeUser: string;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.typeUser = TypeUser.NONCONNECTE;
  }

  getTypeUser() {
    return this.typeUser;
  }

  signOutUser() {
    this.typeUser = TypeUser.NONCONNECTE;
    firebase.auth().signOut();
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            this.setTypeUser(email);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  setTypeUser(email: string) {
    const url  = 'http://localhost:3000/users?mail=' + email;
    this.httpClient
      .get<Personne[]>(url)
      .subscribe(
        (response) => {
          this.typeUser = response[0].type;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state.url + ' ' + state);

    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              if (state.url.includes('reference')) {
                if (this.typeUser === TypeUser.ADMIN || this.typeUser === TypeUser.CHEF) {
                  resolve(true);
                } else {
                  this.router.navigate(['/auth']);
                  resolve(false);
                }
              } else if (state.url.includes('user')) {
                if (this.typeUser === TypeUser.ADMIN) {
                  resolve(true);
                } else {
                  this.router.navigate(['/auth']);
                  resolve(false);
                }
              }
            } else {
              this.router.navigate(['/auth']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
