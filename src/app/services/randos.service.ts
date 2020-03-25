import { Injectable } from '@angular/core';
import {Personne} from '../models/personne.model';
import {Rando} from '../models/rando.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandosService {

  randonne: Rando[] = [
    {
      id: 1,
      ville: 'Marseille',
      nom: 'Calanque Luminy',
      longitude: '5.435990',
      description: 'Magnifique randonné dans les calanques de Marseille',
      dateDepart: '20/05/2020',
      heureDepart: '16:15',
      lattitude: '43.232230',
    }
];
  randoSubject = new Subject<Rando[]>();

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  emitRando() {
    this.randoSubject.next(this.randonne.slice());
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




