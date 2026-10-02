import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { API_URL, Prestamo } from './modelos';

@Injectable({ providedIn: 'root' })
export class PrestamoService {
  private readonly http = inject(HttpClient);

  listar() {
    return this.http.get<Prestamo[]>(`${API_URL}/api/prestamos`);
  }

  solicitar(monto: number, plazoMeses: number) {
    return this.http.post<Prestamo>(`${API_URL}/api/prestamos`, { monto, plazoMeses });
  }

  resolver(id: string, estado: 'APROBADO' | 'RECHAZADO') {
    return this.http.patch<Prestamo>(`${API_URL}/api/prestamos/${id}/resolucion`, { estado });
  }
}
