import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCarouselComponent } from '../team-carousel/team-carousel.component';

@Component({
  selector: 'app-who-we-are',
  imports: [TeamCarouselComponent],
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.css'
})
export class WhoWeAreComponent {

}
