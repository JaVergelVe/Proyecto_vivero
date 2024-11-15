import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Interceptando solicitud...");

  const token = localStorage.getItem("token");
  const authService = inject(AuthService); 

  if (req.url.includes("/api")) {
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(clonedReq).pipe(
        catchError((error) => handleError(error, authService))
      );
    }
  }

  return next(req).pipe(catchError((error) => handleError(error, authService)));
};

const handleError = (error: HttpErrorResponse, authService: AuthService) => {

  Swal.fire({
    icon: 'error',
    title: '¡Oops!',
    text: 'Hubo un error en el sistema, por favor intenta nuevamente más tarde.',
    confirmButtonText: 'Aceptar',
  });
  

  if (error.status === 401 || error.status === 403) {
    authService.logout(); 
    const router = inject(Router);
    router.navigate(['**']); 
  }

  return throwError(() => new Error("Ocurrió un error"));
};
