import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'obra',
    loadComponent: () => import('./obra/obra.page').then( m => m.ObraPage)
  },
  {
    path: 'empleado',
    loadComponent: () => import('./empleado/empleado.page').then( m => m.EmpleadoPage)
  },
  {
    path: 'partes-de-obra',
    loadComponent: () => import('./partes-de-obra/partes-de-obra.page').then( m => m.PartesDeObraPage)
  },
  
];
