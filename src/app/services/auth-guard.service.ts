/**
 * @memberof app
 * @ngdoc auth-guards.service
 * @name AuthGuardService
 * @param {UserService} userService
 * @param {Router} router
 * @description
 *    Notre service sert à gérer les connexions via l'interface Signin.
 */


import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) { }
  /**
   * @memberof AuthGuardService
   * @description
   * returns boolean
   * Récupération informations authentification
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (this.userService.jwt === '') {
      return false;
    } else {
      return true;
    }
  }
}
