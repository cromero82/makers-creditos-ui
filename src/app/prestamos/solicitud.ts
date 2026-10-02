import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PrestamoService } from '../core/prestamo.service';

@Component({
  selector: 'app-solicitud',
  imports: [ReactiveFormsModule],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.css',
})
export class Solicitud {
  private readonly prestamos = inject(PrestamoService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  readonly error = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    monto: [null as number | null, [Validators.required, Validators.min(0.01)]],
    plazoMeses: [null as number | null, [Validators.required, Validators.min(1), Validators.max(360)]],
  });

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { monto, plazoMeses } = this.form.getRawValue();
    this.prestamos.solicitar(Number(monto), Number(plazoMeses)).subscribe({
      next: () => void this.router.navigateByUrl('/prestamos'),
      error: (err: HttpErrorResponse) => this.error.set(err.error?.detail ?? 'No fue posible crear la solicitud'),
    });
  }
}
