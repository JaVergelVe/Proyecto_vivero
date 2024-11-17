import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceTsService } from '../../services/api.service.ts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private _router: Router,
    private empleadoService: ApiServiceTsService,  
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

  ngOnInit(): void {}

  hasErrors(field: string, typeError: string) {
    return (
      this.employeeForm.get(field)?.hasError(typeError) &&
      this.employeeForm.get(field)?.touched
    );
  }


  navegate(ruta:string):void{

    this._router.navigate([ruta])

  }


  agregarEmpleado(): void {
    if (this.employeeForm.valid) {
      
      this.empleadoService.crearEmpleado(this.employeeForm.value).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Empleado creado',
            text: 'El empleado ha sido creado correctamente.',
            confirmButtonText: 'Aceptar',
          });
          
          this._router.navigate(['']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear',
            text: 'Hubo un error al crear el empleado. Intenta nuevamente.',
            confirmButtonText: 'Aceptar',
          });
          
        }
      );
      
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