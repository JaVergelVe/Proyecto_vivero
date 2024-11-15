import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  constructor(

    private _router: Router,


  ) {}
  navegate(ruta:string):void{

    this._router.navigate([ruta])

  }
}
