import { Component, inject, signal } from '@angular/core';

import { FechaPipe } from '../core/fecha.pipe';
import { MonedaPipe } from '../core/moneda.pipe';
import { Prestamo } from '../core/modelos';
import { PrestamoService } from '../core/prestamo.service';

@Component({
  selector: 'app-lista',
  imports: [MonedaPipe, FechaPipe],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  private readonly prestamos = inject(PrestamoService);
  readonly filas = signal<Prestamo[]>([]);
  readonly error = signal('');

  constructor() {
    this.prestamos.listar().subscribe({
      next: (filas) => this.filas.set(filas),
      error: () => this.error.set('No fue posible consultar los préstamos'),
    });
  }
}
