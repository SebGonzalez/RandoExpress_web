import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Personne} from '../models/personne.model';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Subject} from 'rxjs';
<<<<<<< HEAD
import {AbstractControl, ValidationErrors} from "@angular/forms";
=======
import {UserService} from './user.service';
>>>>>>> d74ddbef5b5dd40c5479d96d7b5ef3b9198c01d4

@Injectable({
  providedIn: 'root'
})

export class PersonsService {
  users: Personne[] = [];
  userSubject = new Subject<Personne[]>();

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {
  this.getPersonsFromBack();
  }

  getPersonsFromBack() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
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

  emitUser() {
    this.userSubject.next(this.users.slice());
  }

  getUserById(id: number) {
    const user = this.users.find(
      (s) => {
        return s.id === id;
      }
    );
    return user;
  }

  addPersonne(user: Personne) {
    this.users.push(user);
    this.emitUser();
  }

  updateUtilisateur(id: number, nom: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] | string | string, prenom: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] | string | string, mail: (string | ((control: AbstractControl) => (ValidationErrors | null))[])[] | string | string, password: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] | string | string) {
    // @ts-ignore
    const user = new Personne(id);
    this.users[+id] = user;
    this.emitUser();
    this.httpClient
      .put('http://localhost:4200/new-user/' + id, user)
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
