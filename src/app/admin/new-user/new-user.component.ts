import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/person.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Router} from '@angular/router';
import {Personne} from '../../models/personne.model';
import {PersonsService} from '../../services/person.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  id: number;
  userEdit: Personne;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
              private personsService: PersonsService,
              private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
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
  onSubmitForm(id: number, nom: string, prenom: string, mail: string, password: string) {
    const formValue = this.userForm.value;

    console.log(formValue.id);
    if (formValue.id >= 0) {
        this.userService.updateUtilisateur(formValue.id, formValue.nom, formValue.prenom, formValue.mail, formValue.password);
        this.router.navigate(['/list']);
        console.log('lol');
    } else {
      const NewUser = new Personne(
        formValue.id = this.userService.users[this.userService.users.length - 1].id + 1,
        formValue.nom,
        formValue.prenom,
        formValue.mail,
        formValue.password
      );
      console.log('lol2');
      this.userService.addPersonne(NewUser);
      this.router.navigate(['/list']);
    }
=======
    // @ts-ignore
    const NewUser = new Personne(
      formValue.id = this.personsService.users[this.personsService.users.length - 1].id + 1,
      formValue.nom,
      formValue.prenom,
      formValue.mail,
      formValue.password
    );
    this.personsService.addPersonne(NewUser);
    this.router.navigate(['/list']);
>>>>>>> d74ddbef5b5dd40c5479d96d7b5ef3b9198c01d4
  }
}
