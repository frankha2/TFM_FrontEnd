import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbarcomponent } from '../../components/topbar/topbar.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [ RouterOutlet, Topbarcomponent, CardModule ] 
})
export class HomePageComponent {}