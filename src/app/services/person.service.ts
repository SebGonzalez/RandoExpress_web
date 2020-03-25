import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Personne} from '../models/personne.model';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Subject} from 'rxjs';

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
}
