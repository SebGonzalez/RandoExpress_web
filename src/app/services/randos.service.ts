import { Injectable } from '@angular/core';
import {Personne} from '../models/personne.model';
import {Rando} from '../models/rando.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RandosService {

  randonne: Rando[] = [];
  randoSubject = new Subject<Rando[]>();

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {
    this.getUsersFromBack();
  }

  getUsersFromBack() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.userService.jwt
      })
    };

    console.log('Lecture des ref :');
    this.httpClient
      .get<Rando[]>('http://localhost:4200/RandoExpress_API/ws/rest/randos', httpOptions)
      .subscribe(
        (response) => {
          this.randonne = response;
          this.emitRando();
          console.log(this.randonne);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  emitRando() {
    this.randoSubject.next(this.randonne);
  }

  getRandoById(id: number) {
    const rando = this.randonne.find(
      (s) => {
        return s.id === id;
      }
    );
    return rando;
  }

  addRando(rando: Rando) {
    this.randonne.push(rando);
    this.emitRando();
  }
}




