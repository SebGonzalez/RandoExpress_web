import { Component, OnInit } from '@angular/core';
import {RandosService} from '../../services/randos.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-rando',
  templateUrl: './single-rando.component.html',
  styleUrls: ['./single-rando.component.css']
})
export class SingleRandoComponent implements OnInit {

  nom = 'nom';
  ville = 'prenom';
  description = 'description';
  dateDepart = 'dateDepart';
  heureDepart = 'heureDepart';
  longitude = 'longitude';
  lattitude = 'lattitude';

  constructor(private userService: RandosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const rando = this.userService.getRandoById(+id);

    this.nom = rando.name;
    this.ville = rando.ville;
    this.description = rando.description;
    this.dateDepart = rando.dateDepart;
    this.heureDepart = rando.heureDepart;
    this.longitude = rando.longitude;
    this.lattitude = rando.latitude;
  }

}
