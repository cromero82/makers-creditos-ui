import { Component, inject, signal } from '@angular/core';

import { FechaPipe } from '../core/fecha.pipe';
import { MonedaPipe } from '../core/moneda.pipe';
import { Prestamo } from '../core/modelos';
import { PrestamoService } from '../core/prestamo.service';

@Component({
  selector: 'app-bandeja',
  imports: [MonedaPipe, FechaPipe],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja {
  private readonly prestamos = inject(PrestamoService);
  readonly filas = signal<Prestamo[]>([]);
  readonly error = signal('');

  constructor() {
    this.cargar();
  }

  resolver(id: string, estado: 'APROBADO' | 'RECHAZADO') {
    this.prestamos.resolver(id, estado).subscribe({
      next: () => this.cargar(),
      error: () => this.error.set('No fue posible cambiar el estado'),
    });
  }

  private cargar() {
    this.prestamos.listar().subscribe({
      next: (filas) => this.filas.set(filas),
      error: () => this.error.set('No fue posible consultar la bandeja'),
    });
  }
}
