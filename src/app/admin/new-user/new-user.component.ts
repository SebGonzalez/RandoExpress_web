import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/person.service';
import {Router} from '@angular/router';
import {Personne} from '../../models/personne.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
}

  initForm() {
    this.userForm = this.formBuilder.group({
        id: 0,
        nom: ['', Validators.required],
        prenom:  ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }
  onSubmitForm() {
    const formValue = this.userForm.value;
    // @ts-ignore
    const NewUser = new Personne(
      formValue.id = this.userService.users[this.userService.users.length - 1].id + 1,
      formValue.nom,
      formValue.prenom,
      formValue.mail,
      formValue.password
    );
    this.userService.addPersonne(NewUser);
    this.router.navigate(['/list']);
  }
}
