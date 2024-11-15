import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceTsService } from '../../services/api.service.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { EmpleadoUnicoComponent } from '../empleado-unico/empleado-unico.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-empleado',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgClass],
  templateUrl: './actualizar-empleado.component.html',
  styleUrl: './actualizar-empleado.component.css'
})
export class ActualizarEmpleadoComponent implements OnInit {

  
  employeeForm: FormGroup;
  empleadoId: string | null = null;
  empleado: any = null; 
  
  

  constructor(
    private formBuilder: FormBuilder, 
    private _router: Router,
    private empleadoService: ApiServiceTsService,  
    private route: ActivatedRoute ,
    private authService : AuthService
  ) 
    {
    
    this.employeeForm = this.formBuilder.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],   
      role: ['', Validators.required]
    });
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

  ngOnInit(): void {

    this.empleadoId = this.route.snapshot.paramMap.get('id');
    if (this.empleadoId) {
      this.obtenerEmpleado(this.empleadoId);
    }
  }

  obtenerEmpleado(id: string): void {
 
    this.empleadoService.getEmpleadoID(id).subscribe(
      (data) => {
        this.empleado = data;    
        this.employeeForm.patchValue({
          primerNombre: this.empleado.name_empleado,
          segundoNombre: this.empleado.name_2, 
          primerApellido: this.empleado.last_name,
          segundoApellido: this.empleado.last_name_2,
          email: this.empleado.email,
          password: this.empleado.password
          
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener empleado',
          text: 'Hubo un error al obtener el empleado. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        });
        this.navegate('empleados')
        
      }
    );
  }


  hasErrors(field: string, typeError: string) {
    return (
      this.employeeForm.get(field)?.hasError(typeError) &&
      this.employeeForm.get(field)?.touched
    );
  }


  navegate(ruta:string):void{

    this._router.navigate([ruta])

  }



  actualizarEmpleado(): void {
    if (this.employeeForm.valid) {
      
  
      if (this.empleadoId) {
        this.empleadoService.actualizarEmpleado(this.empleadoId,this.employeeForm.value).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Empleado actualizado',
              text: 'El empleado ha sido actualizado correctamente.',
              confirmButtonText: 'Aceptar',
            });
            
            this._router.navigate(['empleados']);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar',
              text: 'Hubo un error al actualizar el empleado. Intenta nuevamente.',
              confirmButtonText: 'Aceptar',
            });
            
          }
        );
        

      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos correctamente.',
        confirmButtonText: 'Aceptar',
      });
      
    }
  }

  
}
