import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Personne} from '../models/personne.model';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  PersonneSubject = new Subject<any[]>();

    Personne = [
    {
      id: 1,
      nom: 'Gonzo',
      prenom: 'Seb',
      mail: 'gonzolito@hotmail.fr',
      password: 'azerty'
    },
    {
      id: 2,
      nom: 'Lamblino',
      prenom: 'Sébastien',
      mail: 'lamblino@hotmail.fr',
      password: 'azerty'
    },
    {
      id: 3,
      nom: 'Roshka',
      prenom: 'Vadym',
      mail: 'vadym@hotmail.fr',
      password: 'azerty'
    },
  ];
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  emitAppareilSubject() {
    this.PersonneSubject.next(this.Personne.slice());
  }

  getUserId(id: number) {
    const user = this.Personne.find(PersonneObject => {
      return PersonneObject.id == id;
    });
    return user;
  }

  addPersonne(nom: string, prenom: string, mail: string, password: string) {
    const PersonneSubject = {
      id: 0,
      nom: '',
      prenom: '',
      mail: '',
      password: ''
    };
    PersonneSubject.nom = nom;
    PersonneSubject.prenom = prenom;
    PersonneSubject.mail = mail;
    PersonneSubject.password = password;
    PersonneSubject.id = this.Personne[(this.Personne.length - 1)].id + 1;
    this.Personne.push(PersonneSubject);
    this.emitAppareilSubject();
  }
}
