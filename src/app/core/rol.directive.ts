import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';

import { AuthService } from './auth.service';

@Directive({ selector: '[appRol]' })
export class RolDirective {
  private readonly template = inject(TemplateRef);
  private readonly view = inject(ViewContainerRef);
  private readonly auth = inject(AuthService);
  readonly appRol = input.required<string>();

  constructor() {
    effect(() => {
      this.view.clear();
      if (this.auth.rol() === this.appRol()) {
        this.view.createEmbeddedView(this.template);
      }
    });
  }
}
