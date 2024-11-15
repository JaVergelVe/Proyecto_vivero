import { Component,  OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceTsService } from '../../services/api.service.ts.service';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empleado-unico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleado-unico.component.html',
  styleUrls: ['./empleado-unico.component.css']
})
export class EmpleadoUnicoComponent implements OnInit {
  empleadoId: string | null = null;
  empleado: any = null;  
  admin:boolean = false;

  constructor(
    private _router: Router,
    private empleadoService: ApiServiceTsService,
    private route: ActivatedRoute ,
    private authService : AuthService

  ) {}

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

  ngOnInit(): void {

    this.empleadoId = this.route.snapshot.paramMap.get('id');

    if (this.empleadoId) {
      this.obtenerEmpleado(this.empleadoId);
    }

    this.admin= this.empleadoService.getVariable()
  }

  obtenerEmpleado(id: string): void {
 
    this.empleadoService.getEmpleadoID(id).subscribe(
      (data) => {
        this.empleado = data;  
        
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener',
          text: 'Hubo un error al obtener el empleado. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        });
        
      }
    );
  }

  navegate(ruta: string): void {
    this._router.navigate([ruta]);
  }


  eliminarEmpleado():void{

    if (this.empleadoId) {
      this.empleadoService.deleteEmpleado(this.empleadoId).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Empleado eliminado',
            text: 'El empleado ha sido eliminado correctamente.',
            confirmButtonText: 'Aceptar',
          });
          
          this._router.navigate(['/empleados']);
        } ,
        
        (error) => Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: 'Hubo un error al eliminar el empleado. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        })
        
      );
    }
  }



  

}
