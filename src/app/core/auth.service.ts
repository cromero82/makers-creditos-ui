import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { API_URL, LoginRespuesta } from './modelos';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly token = signal<string | null>(sessionStorage.getItem('token'));
  readonly email = signal<string | null>(sessionStorage.getItem('email'));
  readonly rol = signal<string | null>(sessionStorage.getItem('rol'));

  login(email: string, password: string) {
    return this.http.post<LoginRespuesta>(`${API_URL}/api/auth/login`, { email, password }).pipe(
      tap((respuesta) => {
        sessionStorage.setItem('token', respuesta.token);
        sessionStorage.setItem('email', respuesta.email);
        sessionStorage.setItem('rol', respuesta.rol);
        this.token.set(respuesta.token);
        this.email.set(respuesta.email);
        this.rol.set(respuesta.rol);
      }),
    );
  }

  logout() {
    sessionStorage.clear();
    this.token.set(null);
    this.email.set(null);
    this.rol.set(null);
    void this.router.navigateByUrl('/login');
  }

  emailOfuscado(): string {
    const email = this.email();
    if (!email) {
      return 'sin sesión';
    }
    const arroba = email.indexOf('@');
    if (arroba <= 2) {
      return '***';
    }
    return email.slice(0, 2) + '***' + email.slice(arroba);
  }
}
