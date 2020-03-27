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
  }

  updateRando(id: number, name: string, ville: string, description: string, latitude: string,
              longitude: string, heureDepart: string, dateDepart: string, owner: Personne, persons: Personne[]) {
    console.log('ID : ' + id);
    const newRando = new Rando(id, name, ville, latitude, description, longitude, heureDepart, dateDepart, null, null);
    const r = this.getRandoById(+newRando.id);
    const index = this.randonne.indexOf(r);
    console.log('Index : ' + index);
    this.randonne[index] = newRando;
    this.emitRando();

    console.log(this.randonne);
  }
}




