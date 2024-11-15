import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { InvernaderosComponent } from './pages/invernaderos/invernaderos.component';
import { PlantasComponent } from './pages/plantas/plantas.component';
import { EmpleadoUnicoComponent } from './pages/empleado-unico/empleado-unico.component';
import { PlantaUnicaComponent } from './pages/planta-unica/planta-unica.component';
import { authGuard } from './guards/auth.guard';
import { InvernaderoUnicoComponent } from './pages/invernadero-unico/invernadero-unico.component';
import { CrearEmpleadoComponent } from './pages/crear-empleado/crear-empleado.component';
import { ActualizarEmpleadoComponent } from './pages/actualizar-empleado/actualizar-empleado.component';
import { ErrorComponent } from './pages/error/error.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },  
    { path: 'home', component: HomeComponent, canActivate: [authGuard] }, 
    { path: 'register', component: RegisterComponent }, 
    { path: 'empleados', component: EmpleadosComponent, canActivate: [authGuard] },
    { path: 'plantas', component: PlantasComponent, canActivate: [authGuard] }, 
    { path: 'invernaderos', component: InvernaderosComponent, canActivate: [authGuard] }, 
    { path: 'empleado/:id', component: EmpleadoUnicoComponent, canActivate: [authGuard] }, 
    { path: 'planta/:id', component: PlantaUnicaComponent, canActivate: [authGuard] }, 
    { path: 'invernadero/:id', component: InvernaderoUnicoComponent, canActivate: [authGuard] },
    { path: 'crearEmpleado', component: CrearEmpleadoComponent, canActivate: [authGuard] }, 
    { path: 'actualizarEmpleado/:id', component: ActualizarEmpleadoComponent, canActivate: [authGuard] }, 

    { path: '**', component: ErrorComponent } 

]