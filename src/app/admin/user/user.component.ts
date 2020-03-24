import {Component, NgModule, OnInit} from '@angular/core';
import {UserService} from '../../services/person.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@NgModule({
  providers: [
    UserService
  ]
})

export class UserComponent implements OnInit {

  isAuth = false;
  Personne: any[];

  constructor(private userservice: UserService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit() {
    this.Personne = this.userservice.Personne;
  }

}
