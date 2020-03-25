import { Component, OnInit } from '@angular/core';
import {Personne} from '../../models/personne.model';
import {Subscription} from 'rxjs';
import {RandosService} from '../../services/randos.service';
import {ActivatedRoute} from '@angular/router';
import {Rando} from '../../models/rando.model';

@Component({
  selector: 'app-list-rando',
  templateUrl: './list-rando.component.html',
  styleUrls: ['./list-rando.component.css']
})
export class ListRandoComponent implements OnInit {

  rando: Rando[];
  randoSubcription: Subscription;
  constructor(private randoService: RandosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.randoSubcription = this.randoService.randoSubject.subscribe(
      (rando: Rando[]) => {
        this.rando = rando;
      }
    );
    this.randoService.emitRando();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.randoSubcription.unsubscribe();
  }

}
