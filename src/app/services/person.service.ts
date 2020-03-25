import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Personne} from '../models/personne.model';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Subject} from 'rxjs';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  users: Personne[] = [
    {
      id: 1,
      nom: 'Gonzo',
      prenom: 'Sébastien',
      mail: 'gonzo@hotmail.fr',
      password: 'azerty'
    },
    {
      id: 2,
      nom: 'Moi',
      prenom: 'Sébastien',
      mail: 'lamblino@hotmail.fr',
      password: 'azerty'
    }
  ];
  userSubject = new Subject<Personne[]>();

  constructor(private httpClient: HttpClient, private router: Router) {
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
