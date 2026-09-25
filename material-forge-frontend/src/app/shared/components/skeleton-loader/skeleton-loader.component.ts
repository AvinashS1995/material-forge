import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-wrap" [attr.aria-label]="'Loading content'" role="status" aria-live="polite">
      @for (i of rows; track i) {
        <div class="skeleton-row" [style.width]="getWidth(i)" [style.height]="height" [style.border-radius]="circle ? '50%' : '4px'">
        </div>
      }
    </div>
  `,
  styles: [`
    .skeleton-wrap { display: flex; flex-direction: column; gap: 8px; }
    .skeleton-row {
      background: linear-gradient(90deg, var(--mf-skeleton-base, #e0e0e0) 25%, var(--mf-skeleton-shine, #f5f5f5) 50%, var(--mf-skeleton-base, #e0e0e0) 75%);
      background-size: 400% 100%;
      animation: skeleton-shimmer 1.4s ease infinite;
    }
    @keyframes skeleton-shimmer {
      0%   { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoaderComponent {
  @Input() count = 1;
  @Input() height = '20px';
  @Input() width = '100%';
  @Input() circle = false;
  @Input() widthVariant = false;

  get rows(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }

  getWidth(i: number): string {
    if (!this.widthVariant) return this.width;
    const variants = ['100%', '85%', '92%', '75%', '88%'];
    return variants[i % variants.length];
  }
}
