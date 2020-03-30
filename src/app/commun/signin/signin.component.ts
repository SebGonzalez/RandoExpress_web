/**
 * @memberof app
 * @ngdoc signin
 * @name SigninComponent
 * @param {FormBuilder} formBuilder
 * @param {UserService} userService
 * @param {Router} router
 * @description
 *    Notre component permet de gérer la connexion des administrateurs pour pouvoir gérer l'application.
 */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  isAdmin: boolean;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.initForm();
    if (this.router.url.startsWith('/admin')) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  /**
   * @memberof SigninComponent
   * @returns {Observable}
   * @description
   * Récupération informtions formulaire
   */

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  /**
   * @memberof SigninComponent
   * @returns {Observable}
   * @description
   * Connexion si email et password sont corrects
   */
  onSignIn() {
    console.log('test connexion')
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.userService.signIn(this.isAdmin, email, password).then(
      () => {
        console.log('Sign in successful!');
        this.router.navigate(['/list-rando']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  /**
   * @memberof SigninComponent
   * @description
   *  Permet la deconnexion.
   */

  onSignOut() {
    this.userService.signOut();
  }

}
