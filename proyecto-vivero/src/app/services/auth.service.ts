import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient,private router: Router) {}


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }


  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']); 
  }
  
}
