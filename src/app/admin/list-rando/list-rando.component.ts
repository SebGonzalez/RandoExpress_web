/**
 * @memberof app
 * @ngdoc list-rando
 * @name ListRandoComponent
 * @param {RandosService} randoService
 * @param {ActivatedRoute} route
 * @param {Router} router
 * @description
 *    Notre component permet d'afficher tous les élements que contient notre API concernant les randonnées.
 */


import {Component, OnInit} from '@angular/core';
import {Personne} from '../../models/personne.model';
import {Subscription} from 'rxjs';
import {RandosService} from '../../services/randos.service';
import {ActivatedRoute, Router} from '@angular/router';
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
              private route: ActivatedRoute,
              private router: Router) {
  }
  /**
   * @memberof ListRandoComponent
   * @returns {Observable}
   * @description
   *  Récupération des randonnées
   */
  ngOnInit() {
    this.randoSubcription = this.randoService.randoSubject.subscribe(
      (rando: Rando[]) => {
        this.rando = rando;
        console.log('this.rando', this.rando);
      }
    );
    this.randoService.emitRando();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.randoSubcription.unsubscribe();
  }
  /**
   * @memberof ListRandoComponent
   * @param {number} id
   * @returns {router}
   * @description
   *  Editer une randonnée
   */

  onEditRando(id: number) {
    console.log('onEditRando : id', id);
    this.router.navigate(['/new-rando', id]);
  }
  /**
   * @memberof ListRandoComponent
   * @param {Rando[]} rando
   * @param {number} id
   * @returns {router}
   * @description
   *  Supprimer une randonnée
   */

  onDeleteRando(rando: Rando[], id: number) {
    this.randoService.deleteRando(id).then(
      () => {
        this.router.navigate(['/list-rando']);
      }
    );
  }

  /**
   * @memberof ListRandoComponent
   * @param {number} id
   * @returns {router}
   * @description
   * Afficher une randonnée
   */
  onViewRando(id: number) {
    this.router.navigate(['/list-rando', id]);
  }
}
