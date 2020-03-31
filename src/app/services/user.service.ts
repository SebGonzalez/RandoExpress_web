import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Personne} from '../models/personne.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwt: string;
  isAdmin: boolean;

  constructor(private httpClient: HttpClient, private router: Router) {
      this.jwt = '';
  }
  signIn(isAdmin: boolean, email: string, password: string) {
    console.log('test co 2');
    this.isAdmin = isAdmin;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = '{ "mail" : "' + email + '", "password" : "' + password + '"}';
    return new Promise(
      (resolve, reject) => {
        if (isAdmin) {
          console.log('test co 3');
          const url  = 'http://localhost:4200/RandoExpress_API/ws/rest/authAdmin';
          this.httpClient
            .post(url, body, httpOptions)
            .subscribe(
              (response) => {
                const responseJSON = JSON.stringify(response);
                const json = JSON.parse(responseJSON);

                console.log(json.message)
                if (json.message === 'Connexion validé') {
                  console.log('ok')
                  this.jwt = json.jwt;
                  resolve();
                } else {
                  console.log('pas ok')
                  reject('Connexion refusé');
                }
              },
              (error) => {
                console.log('Erreur ! : ' + error);
              }
            );
        } else { // ajout connexion client
        }
      }
    );
  }

  signInAdmin(email: string, password: string) {
    console.log('test co 4');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const body = '{ "mail" : "' + email + '", "password" : "' + password + '"}';
    const url  = 'http://localhost:4200/RandoExpress_API/ws/rest/authAdmin';
    this.httpClient
      .post(url, body, httpOptions)
      .subscribe(
        (response) => {
          const responseJSON = JSON.stringify(response);
          const json = JSON.parse(responseJSON);

          console.log(json.message)
          if (json.message === 'Connexion validé') {
            console.log('ok')
            this.jwt = json.jwt;
            return true;
          } else {
            console.log('pas ok')
            return false;
          }
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  signOut() {
    this.jwt = '';
  }
}
