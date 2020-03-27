import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RandosService} from '../../services/randos.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Rando} from '../../models/rando.model';

@Component({
  selector: 'app-new-rando',
  templateUrl: './new-rando.component.html',
  styleUrls: ['./new-rando.component.css']
})
export class NewRandoComponent implements OnInit {

  randoForm: FormGroup;
  id: number;
  randoEdit: Rando;

  constructor(private formBuilder: FormBuilder,
              private randoService: RandosService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.randoEdit = this.randoService.getRandoById(+this.id);
    } else {
      this.randoEdit = new Rando(-1, '', '', '', '',
        '', '', '', null, null);
    }
    this.initForm();
  }

  initForm() {
    this.randoForm = this.formBuilder.group({
        name: [this.randoEdit.name],
        ville: [this.randoEdit.ville],
        description: [this.randoEdit.description],
        latitude: [this.randoEdit.latitude],
        longitude: [this.randoEdit.longitude],
        heureDepart: [this.randoEdit.heureDepart],
        dateDepart: [this.randoEdit.dateDepart]
      }
    );
  }

  onSubmitForm() {
    const formValue = this.randoForm.value;
    if (this.id === -1) {
      const NewRando = new Rando(
        formValue.id = null,
        formValue.name,
        formValue.ville,
        formValue.description,
        formValue.latitude,
        formValue.longitude,
        formValue.heureDepart,
        formValue.dateDepart,
        null, null
      );

      this.randoService.addRando(NewRando);
      this.router.navigate(['/list-rando']);

    } else {
      console.log('formValue', formValue.id);
      console.log('formValue', formValue);
      this.randoService.updateRando(this.id, formValue.name, formValue.ville,
        formValue.description, formValue.latitude, formValue.longitude,
        formValue.heureDepart, formValue.dateDepart, this.randoEdit.owner, this.randoEdit.persons);
      this.router.navigate(['/list-rando']);

    }
  }
}
