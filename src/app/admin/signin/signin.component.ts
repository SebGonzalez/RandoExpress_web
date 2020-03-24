import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from '../../services/person.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authStatus: boolean;
  PersonneSubject: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['Personne']);
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

}
