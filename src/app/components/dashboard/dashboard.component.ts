import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'phone',
    'email',
    'address',
    'longitude',
    'latitude',
    'number',
  ];
  dataSource: any[] = [];
  map: any;
  showMap: boolean = false;
  latitude: number = 51.505;
  longitude: number = -0.09;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['name']) {
      this.showMap = true;
      this.longitude = this.route.snapshot.queryParams['longitude'];
      this.latitude = this.route.snapshot.queryParams['latitude'];
    }
    this.dataSource = [this.route.snapshot.queryParams];
    this.configMap();
  }

  configMap() {
    this.map = L.map('map', {
      attributionControl: true,
      scrollWheelZoom: false,
      zoom: 8,
    }).setView([this.latitude, this.longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    L.marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup('Your Location.')
      .openPopup();
    window.dispatchEvent(new Event('resize'));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
