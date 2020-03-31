/**
 * @memberof app
 * @ngdoc auth-guards.service
 * @name AuthGuardService
 * @param {UserService} userService
 * @param {Router} router
 * @description
 *    Notre service sert à gérer les connexions via l'interface Signin.
 */


import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) { }
  /**
   * @memberof AuthGuardService
   * @description
   * returns boolean
   * Récupération informations authentification
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.jwt === '') {
      this.router.navigate(['/admin/auth']);
      return false;
    } else {
      return true;
    }
  }
}
