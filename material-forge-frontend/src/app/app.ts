import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <router-outlet />
  `,
})
export class App {}
