import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core'; 
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements AfterViewInit {
  @ViewChild('successModal') successModal!: ElementRef<HTMLDialogElement>;

  contactForm: FormGroup;
  isLoading = false;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    console.log('Modal reference:', this.successModal);
  }

  openModal() {
    if (this.successModal?.nativeElement) {
      this.successModal.nativeElement.showModal();
    }
  }

  closeModal() {
    if (this.successModal?.nativeElement) {
      this.successModal.nativeElement.close();
    }
    this.resetForm();
  }

 onSubmit() {
  if (this.contactForm.invalid) {
    this.markAllAsTouched();
    return;
  }

  this.isLoading = true;

  const userName = this.contactForm.value.name;
  const userEmail = this.contactForm.value.email;
  const userMessage = this.contactForm.value.message;

  const formData = new FormData();
  formData.append('name', userName);
  formData.append('email', userEmail);
  formData.append(
    'message',
    `Olá ${userName},\n\nRecebemos sua mensagem:\n"${userMessage}"\n\nEntraremos em contato em breve. 💌\n\nEquipe Aulovers`
  );
  formData.append('_cc', userEmail);
  formData.append('_replyto', userEmail);
  formData.append('_subject', `Nova mensagem de ${userName}`);

  this.http.post('https://formspree.io/f/mvgrjkpw', formData).subscribe({
    next: () => {
      this.formSubmitted = true;
      this.isLoading = false;
      this.openModal();
    },
    error: (err) => {
      console.error('Erro no envio:', err);
      this.isLoading = false;
      alert(
        'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.'
      );
    },
  });
}


  resetForm() {
    this.formSubmitted = false;
    this.contactForm.reset();
  }

  private markAllAsTouched() {
    Object.values(this.contactForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}  