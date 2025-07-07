import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';

type HamburgerElement = HTMLElement;
type MenuElement = HTMLElement;
type NavLink = HTMLAnchorElement;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  activeSection: string = 'whoWeAre';

  @ViewChild('hamburger') hamburgerRef!: ElementRef<HamburgerElement>;
  @ViewChild('menuRight') menuRightRef!: ElementRef<MenuElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setupMenuToggle();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = [
      'whoWeAre',
      'services',
      'benefits',
      'testimonials',
      'contact',
    ];
    const scrollPosition = window.pageYOffset + 100;

    for (let section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  private setupMenuToggle(): void {
    
    setTimeout(() => {
      const hamburger = this.hamburgerRef?.nativeElement;
      const menuRight = this.menuRightRef?.nativeElement;

      if (hamburger && menuRight) {
        this.renderer.listen(hamburger, 'click', () => {
          this.toggleClass(hamburger, 'active');
          this.toggleClass(menuRight, 'active');

          const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
          this.renderer.setAttribute(
            hamburger,
            'aria-expanded',
            (!isExpanded).toString()
          );
        });

        const navLinks = menuRight.querySelectorAll('.nav-links a');
        navLinks.forEach((link) => {
          const anchor = link as HTMLAnchorElement;
          this.renderer.listen(anchor, 'click', () => {
            if (hamburger.classList.contains('active')) {
              this.removeClass(hamburger, 'active');
              this.removeClass(menuRight, 'active');
              this.renderer.setAttribute(hamburger, 'aria-expanded', 'false');
            }
          });
        });
      }
    });
  }

  private toggleClass(element: HTMLElement, className: string): void {
    if (element.classList.contains(className)) {
      this.renderer.removeClass(element, className);
    } else {
      this.renderer.addClass(element, className);
    }
  }

  private removeClass(element: HTMLElement, className: string): void {
    this.renderer.removeClass(element, className);
  }
}
