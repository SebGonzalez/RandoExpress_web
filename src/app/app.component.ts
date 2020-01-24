import { Component, OnInit  } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'randoExpress';

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre
    const myfrugalmap = L.map('frugalmap').locate({setView: true, maxZoom: 16});
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    const ImageEz = L.icon({
      iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png'
    });

    const ImageMidle = L.icon({
      iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-orange.png'
    });
    // Les différents endroits que l'on a marqué
    L.marker([43.227462, 5.4381482], {icon: ImageMidle}).bindPopup('La Rando de Boucelma').addTo(myfrugalmap).openPopup();
    L.marker([44.227462, 5.4381482], {icon: ImageEz}).bindPopup('La Randodo').addTo(myfrugalmap).openPopup();
    L.marker([44.227462, 6.4381482], {icon: ImageEz}).bindPopup('La Randodo').addTo(myfrugalmap).openPopup();
    L.marker([44.227462, 6], {icon: ImageMidle}).bindPopup('Tableau').addTo(myfrugalmap).openPopup();

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    function onLocationFound(e) {
      const radius = e.accuracy;

      L.marker(e.latlng).addTo(myfrugalmap)
        .bindPopup('Vous êtes ici !').openPopup();

      L.circle(e.latlng, 35000).addTo(myfrugalmap);
    }

    myfrugalmap.on('locationfound', onLocationFound);
  }
}
