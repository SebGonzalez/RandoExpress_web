import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Personne} from '../models/personne.model';
import * as firebase from 'firebase';


export enum TypeUser {
  ADMIN= 'Administrateur',
  CHEF= 'Chef',
  SALARIE= 'Salarié',
  NONCONNECTE= 'NonConnecte'
}

@Injectable({
  providedIn: 'root'
})
export class PersonnesService {
  users: Personne[] = [];
  usersSubject = new Subject<Personne[]>();

  constructor(private httpClient: HttpClient) {
    this.getUsersFromBack();
  }

  emitUsersSubject() {
    this.usersSubject.next(this.users);
  }

  getUsersFromBack() {
    console.log('Lecture des ref :');
    this.httpClient
      .get<Personne[]>('http://localhost:3000/users')
      .subscribe(
        (response) => {
          this.users = response;
          this.emitUsersSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getSingleUser(id: number) {
    return this.users[id];
  }

  getNewIdForUtilisateur() {
    return +this.users[this.users.length - 1].id + 1;
  }

  createUtilisateur(email: string, password: string, type: string) {
    const user = new Personne('' + this.getNewIdForUtilisateur(), email, type);
    this.users.push(user);
    this.emitUsersSubject();

    this.httpClient
      .post('http://localhost:3000/users', user)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  updateUtilisateur(id: string, mail: string, type: string) {
    const user = new Personne(id, mail, type);
    this.users[+id] = user;
    this.emitUsersSubject();
    this.httpClient
      .put('http://localhost:3000/users/' + id, user)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
