import {Injectable} from '@angular/core';
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
        'Content-Type': 'application/json',
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
    this.randoSubject.next(this.randonne.slice());
  }

  getSingleRando(id: number) {
    return this.randonne[id];
  }

  getRandoById(id: number) {
    for ( const r of this.randonne) {
      // tslint:disable-next-line:triple-equals
      if (r.id == id) {
        return r;
      }
    }
  }

  addRando(rando: Rando) {
    this.randonne.push(rando);
    this.emitRando();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.userService.jwt
      })
    };
    // tslint:disable-next-line:max-line-length
    let body = '{ "id" : "' + rando.id + '", "name" : "' + name + '", "ville" : "' + rando.ville + '", "description" : "' + rando.description + '", "latitude" : "' + rando.latitude + '", "longitude" : "' + rando.longitude + '", "heureDepart" : "' + rando.heureDepart + '", "dateDepart" : "' + rando.dateDepart + '", "owner" : { "id" : "' + rando.owner.id + '", "name" : "' + rando.owner.name + '", "firstName" : "' + rando.owner.firstName + '", "mail" : "' + rando.owner.mail + '", "password" : "' + rando.owner.password + '" }, "persons" : [';
    for (const p of rando.persons) {
      // tslint:disable-next-line:max-line-length
      body += '{ "id" : "' + p.id + '", "name" : "' + p.name + '", "firstName" : "' + p.firstName + '", "mail" : "' + p.mail + '", "password" : "' + p.password + '" },';
    }

    body = body.substring(0, body.length - 1);
    body += ' ] }';

    console.log(body);

    return new Promise(
      (resolve, reject) => {
        const url  = 'http://localhost:4200/RandoExpress_API/ws/rest/rando';
        this.httpClient
          .post(url, body, httpOptions)
          .subscribe(
            (response) => {
              resolve();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );

      }
    );
  }

  updateRando(id: number, name: string, ville: string, description: string, latitude: string,
              longitude: string, heureDepart: string, dateDepart: string, owner: Personne, persons: Personne[]) {
    const newRando = new Rando(id, name, ville, latitude, description, longitude, heureDepart, dateDepart, null, null);
    const r = this.getRandoById(+newRando.id);
    const index = this.randonne.indexOf(r);
    this.randonne[index] = newRando;
    this.emitRando();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.userService.jwt
      })
    };
    // tslint:disable-next-line:max-line-length
    let body = '{ "id" : "' + id + '", "name" : "' + name + '", "ville" : "' + ville + '", "description" : "' + description + '", "latitude" : "' + latitude + '", "longitude" : "' + longitude + '", "heureDepart" : "' + heureDepart + '", "dateDepart" : "' + dateDepart + '", "owner" : { "id" : "' + owner.id + '", "name" : "' + owner.name + '", "firstName" : "' + owner.firstName + '", "mail" : "' + owner.mail + '", "password" : "' + owner.password + '" }, "persons" : [';
    for (const p of persons) {
      // tslint:disable-next-line:max-line-length
      body += '{ "id" : "' + p.id + '", "name" : "' + p.name + '", "firstName" : "' + p.firstName + '", "mail" : "' + p.mail + '", "password" : "' + p.password + '" },';
    }

    body = body.substring(0, body.length - 1);
    body += ' ] }';

    console.log(body);

    return new Promise(
      (resolve, reject) => {
        const url  = 'http://localhost:4200/RandoExpress_API/ws/rest/rando';
        this.httpClient
          .put(url, body, httpOptions)
          .subscribe(
            (response) => {
              resolve();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );

      }
    );
  }

  deleteRando(id: number) {
    const tmp = this.getRandoById(id);
    const index = this.randonne.indexOf(tmp);
    delete this.randonne[index];
    this.emitRando();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.userService.jwt
      })
    };
    // tslint:disable-next-line:max-line-length
    return new Promise(
      (resolve, reject) => {
        const url  = 'http://localhost:4200/RandoExpress_API/ws/rest/rando/' + id;
        this.httpClient
          .delete(url, httpOptions)
          .subscribe(
            (response) => {
              resolve();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );

      }
    );
  }
}




