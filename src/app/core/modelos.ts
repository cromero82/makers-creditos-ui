export const API_URL = 'http://localhost:8090';

export interface LoginRespuesta {
  token: string;
  email: string;
  rol: 'USER' | 'ADMIN';
}

export interface Prestamo {
  id: string;
  email: string;
  monto: number;
  plazoMeses: number;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  creadoEn: string;
}
