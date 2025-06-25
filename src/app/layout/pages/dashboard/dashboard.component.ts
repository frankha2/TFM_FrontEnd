import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MapComponent } from '../../../shared/components/map/map.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CardModule, MapComponent, CardModule]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}