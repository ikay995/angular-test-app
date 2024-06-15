import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'email'];
  dataSource: any[] = [];
  map: any;
  showMap: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['name']) this.showMap = true;
    this.dataSource = [this.route.snapshot.queryParams];
    this.configMap();
  }

  configMap() {
    this.map = L.map('map', {
      attributionControl: true,
      center: [6.458985, 3.601521],
      scrollWheelZoom: false,
      zoom: 8,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    L.marker([51.5, -0.09])
      .addTo(this.map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
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
