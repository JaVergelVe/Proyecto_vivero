import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ApiServiceTsService } from '../../services/api.service.ts.service';

@Component({
  selector: 'app-planta-unica',
  standalone: true,
  imports: [],
  templateUrl: './planta-unica.component.html',
  styleUrl: './planta-unica.component.css'
})
export class PlantaUnicaComponent {
  

  plantaID: string | null = null;
  planta: any = null;  


  constructor(
    private _router: Router,
    private plantaService: ApiServiceTsService,
    private route: ActivatedRoute ,
    private authService : AuthService

  ) {}



  ngOnInit(): void {

    this.plantaID = this.route.snapshot.paramMap.get('id');

    if (this.plantaID) {
      this.obtenerPlanta(this.plantaID);
    }

  }

  obtenerPlanta(id: string): void {
 
    this.plantaService.getPlantaID(id).subscribe(
      (data) => {
        this.planta = data;  
        
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener',
          text: 'Hubo un error al obtener la planta. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        });

        console.log(error)
        
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
