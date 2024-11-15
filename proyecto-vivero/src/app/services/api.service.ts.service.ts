import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceTsService {
  public admin: boolean = false;
  private myVariableKey = 'myVariable';

  private apiUrl = 'http://localhost:3000/api/';  

  constructor(private http: HttpClient) { }


  getEmpleados(): Observable<any[]> { 
    return this.http.get<any[]>(this.apiUrl+'empleados');
  }

  getEmpleadoID(id: string): Observable<any[]>{

    return this.http.get<any[]>(this.apiUrl+'empleados/'+id);
  }

  deleteEmpleado(id: string): Observable<any[]>{

    return this.http.delete<any[]>(this.apiUrl+'empleados/'+id);

  }

  actualizarEmpleado(id: string, empleado: any): Observable<any[]>{
    return this.http.put<any[]>(this.apiUrl+'empleados/'+id,empleado);
  }

  crearEmpleado(empleado: any): Observable<any> {
  return this.http.post<any>(this.apiUrl + 'empleados', empleado);
}

setVariable(value: boolean): void {
  localStorage.setItem(this.myVariableKey, JSON.stringify(value));
}

getVariable(): boolean {
  const value = localStorage.getItem(this.myVariableKey);
  return value ? JSON.parse(value) : false; 
}
  

  getPlantas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'plantas');
  }

  getPlantaID(id: string): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'plantas/'+id);
  }
}
