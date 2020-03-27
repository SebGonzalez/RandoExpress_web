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
      this.jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoMCJ9.izVguZPRsBQ5Rqw6dhMvcIwy8_9lQnrO3vpxGwPCuzs';
  }

  signIn(isAdmin: boolean, email: string, password: string) {
    console.log('test co 2');
    this.isAdmin = isAdmin;
    return new Promise(
      (resolve, reject) => {
        if (isAdmin) {
          console.log('test co 3');
          this.signInAdmin(email, password);
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

          console.log(responseJSON);
          console.log(responseJSON[0]['message'] + ' ' + response[1]);
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
