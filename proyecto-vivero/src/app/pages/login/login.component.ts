import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiServiceTsService } from '../../services/api.service.ts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService:ApiServiceTsService,
    private router: Router
  ) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}


  login() {
    if (this.contactForm.valid) {
      const { email, password } = this.contactForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.authService.guardarToken(response.token);
          if(email=="cgomez@vivero.com"){
            this.apiService.setVariable(true);
          }else{
            this.apiService.setVariable(false);
          }
          this.router.navigate(['/home']); 
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error de login',
            text: 'Las credenciales que ingresaste son incorrectas. Intenta nuevamente.',
            confirmButtonText: 'Aceptar',
          });
          
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos correctamente.',
        confirmButtonText: 'Aceptar',
      });
      
    }
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.contactForm.get(field)?.hasError(typeError) &&
      this.contactForm.get(field)?.touched
    );
  }
}