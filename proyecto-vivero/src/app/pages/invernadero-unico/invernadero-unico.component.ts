// import { Component, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-invernadero-unico',
//   standalone: true,
//   imports: [],
//   templateUrl: './invernadero-unico.component.html',
//   styleUrl: './invernadero-unico.component.css'
// })
// export class InvernaderoUnicoComponent {

//   temperaruta:number=0;
//   gas:number=0;
//   humedad:string=''

//   constructor(
    
//     private authService: AuthService,  
//     private _router: Router
//   ) {}


  
//   navegate(ruta:string):void{

//     this._router.navigate([ruta])

//   }

//   cerrarSesion(){
//     Swal.fire({
//       title: '¿Estás seguro?',
//       text: '¿Seguro que deseas cerrar sesión?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Sí, cerrar sesión',
//       cancelButtonText: 'Cancelar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.authService.logout();
//         Swal.fire('Cerrado', 'Has cerrado sesión exitosamente.', 'success');
//       }
//     });
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invernadero-unico',
  standalone: true,
  templateUrl: './invernadero-unico.component.html',
  styleUrls: ['./invernadero-unico.component.css'],
})
export class InvernaderoUnicoComponent implements OnInit, OnDestroy {
  temperaruta: number = 0;
  gas: string = '';
  humedad: string = '';
  private socket: WebSocket | null = null;

  constructor(private authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    // Conectar al servidor WebSocket
    this.socket = new WebSocket('ws://192.168.1.9:3000'); // Cambia por la URL de tu servidor

    this.socket.onopen = () => {
      console.log('Conexión WebSocket establecida con el servidor.');
    };

    this.socket.onmessage = (event) => {
      console.log('Mensaje recibido del servidor:', event.data);

      try {
        // Parsear los datos recibidos
        const data = JSON.parse(event.data);
        this.temperaruta = data.temperatura || 0;
        this.gas = data.gas || 'No detectado';
        this.humedad = data.humedadSuelo === 1 ? 'Baja' : 'Alta';
      } catch (error) {
        console.error('Error procesando los datos:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('Conexión WebSocket cerrada.');
    };

    this.socket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };
  }

  ngOnDestroy(): void {
    // Cerrar la conexión WebSocket
    if (this.socket) {
      this.socket.close();
    }
  }

  navegate(ruta: string): void {
    this._router.navigate([ruta]);
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