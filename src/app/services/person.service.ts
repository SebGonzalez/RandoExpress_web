import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Personne} from '../models/personne.model';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Subject} from 'rxjs';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {UserService} from './user.service';
import {Rando} from "../models/rando.model";

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

  emitUser() {
    this.userSubject.next(this.users.slice());
  }

  getSingleUser(id: number) {
    return this.users[id];
  }

  getUserById(id: number) {
    for ( const u of this.users) {
      // tslint:disable-next-line:triple-equals
      if (u.id == id) {
        return u;
      }
    }
  }

  addPersonne(user: Personne) {
    this.users.push(user);
    this.emitUser();
  }

  updatePersonne(id: number, name: string, firstName: string, mail: string, password: string) {
    const user = new Personne(id, name, firstName, mail, password);

    console.log('ID : ' + id);
    const newUser = new Personne(id, name, firstName, mail, password);
    const r = this.getUserById(+newUser.id);
    const index = this.users.indexOf(r);
    this.users[index] = newUser;
    this.emitUser();
  }
}
