import { Routes } from '@angular/router';

import { adminGuard, authGuard } from './core/auth.guard';
import { Bandeja } from './admin/bandeja';
import { Shell } from './layout/shell';
import { Login } from './login/login';
import { Lista } from './prestamos/lista';
import { Solicitud } from './prestamos/solicitud';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'prestamos' },
      { path: 'prestamos', component: Lista },
      { path: 'prestamos/nuevo', component: Solicitud },
      { path: 'admin', component: Bandeja, canActivate: [adminGuard] },
    ],
  },
  { path: '**', redirectTo: '' },
];
