import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-carousel.component.html',
  styleUrls: ['./team-carousel.component.css'],
})
export class TeamCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('track') track!: ElementRef;
  currentIndex = 0;
  slideWidth = 0;
  autoplayInterval: any;
  cardsPerView = 3; // Padrão desktop
  slidesCount = 0;

  public Math = Math;

  teamMembers = [
    {
      name: 'Dra. Letícia',
      role: 'Fundadora',
      image: '/Founder.svg',
      description:
        'Veterinária com 6 anos de experiência em cuidados integrados e bem-estar animal.',
      tags: ['Veterinária', 'Cuidados'],
      badgeClass: 'founder',
    },
    {
      name: 'João T.',
      role: 'Tosador',
      image: '/Groomer.svg',
      description:
        'Especialista em estética pet com foco em conforto e bem-estar dos animais.',
      tags: ['Tosa', 'Estética'],
      badgeClass: 'groomer',
    },
    {
      name: 'Ana P.',
      role: 'Atendimento',
      image: '/Receptionist.svg',
      description:
        'Recepcionista que garante carinho e atenção logo na entrada dos nossos clientes.',
      tags: ['Recepção', 'Atenção'],
      badgeClass: 'reception',
    },
    {
      name: 'Carlos M.',
      role: 'Veterinário',
      image: '/Doctor.svg',
      description:
        'Especialista em emergências e cuidados intensivos para pets.',
      tags: ['Emergências', 'UTI Pet'],
      badgeClass: 'vet',
    },
    {
      name: 'Mariana A.',
      role: 'Veterinária',
      image: '/Doctor-2.svg',
      description:
        'Especialista em emergências e cuidados intensivos para pets.',
      tags: ['Emergências', 'UTI Pet'],
      badgeClass: 'vet',
    },
    {
      name: 'Angela M.',
      role: 'Tosador',
      image: '/Groomer-2.svg',
      description:
        'Especialista em estética pet com foco em conforto e bem-estar dos animais',
      tags: ['Tosa', 'Estética'],
      badgeClass: 'groomer',
    },
  ];

  ngOnInit() {
    this.slidesCount = this.teamMembers.length;
    this.startAutoplay();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onResize(); // já ajusta cardsPerView e largura do slide
    }, 0);
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  @HostListener('window:resize')
  onResize() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 640) {
      this.cardsPerView = 1;
    } else if (screenWidth <= 1024) {
      this.cardsPerView = 2;
    } else {
      this.cardsPerView = 3;
    }

    this.calculateSlideWidth();
    this.updateCarousel();
  }

  calculateSlideWidth() {
    const slide = this.track?.nativeElement?.querySelector('.carousel-slide');
    if (slide) {
      this.slideWidth = slide.offsetWidth;
    }
  }

  updateCarousel() {
    if (this.track?.nativeElement) {
      this.track.nativeElement.style.transform = `translateX(-${
        this.currentIndex * this.slideWidth
      }px)`;
    }
  }

  get transitionSpeed(): string {
    return '800ms';
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoplay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slidesCount;
    this.updateCarousel();
    this.resetAutoplay();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slidesCount) % this.slidesCount;
    this.updateCarousel();
    this.resetAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.nextSlide(), 8000); // Alterado de 5000 para 8000ms
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  onMouseEnter() {
    this.stopAutoplay();
  }

  onMouseLeave() {
    this.startAutoplay();
  }

  get indicatorCount(): number[] {
    return Array.from({
      length: Math.ceil(this.slidesCount / this.cardsPerView),
    });
  }
}
