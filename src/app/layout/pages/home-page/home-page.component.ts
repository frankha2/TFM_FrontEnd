import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbarcomponent } from '../../components/topbar/topbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [ RouterOutlet, Topbarcomponent, SidebarComponent ] 
})
export class HomePageComponent {}