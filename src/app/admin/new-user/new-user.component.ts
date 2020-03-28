import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
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
              private route: ActivatedRoute,
              private personsService: PersonsService,
              private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log('this.id', this.id);
    if (this.id) {
      this.userEdit = this.personsService.getUserById(this.id);
      console.log('this.useredit', this.userEdit);
    } else {
      this.userEdit = new Personne(-1, '', '', '', '');
    }
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
        name: [this.userEdit.name, Validators.required],
        firstName: [this.userEdit.firstName, Validators.required],
        mail: [this.userEdit.mail, [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }

  onSubmitForm(id: number, name: string, firstName: string, mail: string, password: string) {
    const formValue = this.userForm.value;
    if (this.userEdit.id === -1) {

      const Newuser = new Personne(
        formValue.id = this.personsService.users[this.personsService.users.length - 1].id + 1,
        formValue.name,
        formValue.firstName,
        formValue.mail,
        formValue.password
      );

      this.personsService.addPersonne(Newuser);
      this.router.navigate(['/list']);

    } else {
      this.personsService.updatePersonne(this.id, formValue.name, formValue.firstName,
        formValue.mail, formValue.password);
      this.router.navigate(['/list']);
    }
  }
}
