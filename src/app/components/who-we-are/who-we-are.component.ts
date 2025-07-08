import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TeamCarouselComponent } from '../team-carousel/team-carousel.component';


@Component({
  selector: 'app-who-we-are',
  imports: [TeamCarouselComponent, NgOptimizedImage],
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.css'
})
export class WhoWeAreComponent {

}
