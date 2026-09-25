import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { NAV_CATEGORIES } from '../../core/constants/navigation.constants';

@Component({
  selector: 'app-component-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, PageHeaderComponent],
  templateUrl: './component-showcase.component.html',
  styleUrl: './component-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentShowcaseComponent {
  readonly categories = NAV_CATEGORIES.filter((c) => c.id !== 'main' && c.id !== 'examples');
}
