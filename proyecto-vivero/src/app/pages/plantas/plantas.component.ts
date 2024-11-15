import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceTsService } from '../../services/api.service.ts.service';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],

  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.css'
})
export class PlantasComponent {
  

  plantas: any[] = []; 
  constructor(
    private plantasService: ApiServiceTsService,  
    private authService: AuthService,  
    private _router: Router
  ) {}

  ngOnInit(): void {
    
    this.plantasService.getPlantas().subscribe(
      (data) => {
        this.plantas = data; 
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener',
          text: 'Hubo un error al obtener la planta. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        });
        
      }
    );
  }
  navegate(ruta:string):void{

    this._router.navigate([ruta])

  }

  cerrarSesion(){
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Seguro que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire('Cerrado', 'Has cerrado sesión exitosamente.', 'success');
      }
    });
  }
}
