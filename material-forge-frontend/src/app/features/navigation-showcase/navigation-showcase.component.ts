import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ReusableButtonComponent } from '../../shared/components/reusable-button/reusable-button.component';
import { ReusableInputComponent } from '../../shared/components/reusable-input/reusable-input.component';
import { ReusableSelectComponent } from '../../shared/components/reusable-select/reusable-select.component';
import { DEPARTMENTS } from '../../core/models/employee.model';
import { SelectOption } from '../../shared/models/form.model';

interface OrgNode { name: string; children?: OrgNode[]; }

@Component({
  selector: 'app-navigation-showcase',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatTabsModule, MatStepperModule, MatExpansionModule,
    MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule,
    MatTreeModule, MatCheckboxModule,
    PageHeaderComponent, ReusableButtonComponent, ReusableInputComponent, ReusableSelectComponent,
  ],
  templateUrl: './navigation-showcase.component.html',
  styleUrl: './navigation-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationShowcaseComponent {
  private readonly fb = inject(FormBuilder);

  readonly step1 = this.fb.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]] });
  readonly step2 = this.fb.group({ city: ['', Validators.required], state: ['', Validators.required] });
  readonly step3 = this.fb.group({ dept: [null, Validators.required] });

  readonly deptOptions: SelectOption[] = DEPARTMENTS.map((d) => ({ label: d.name, value: d.id }));

  readonly orgTree: OrgNode[] = [
    { name: 'Organization', children: [
      { name: 'Gujarat', children: [
        { name: 'Ahmedabad' }, { name: 'Surat' }, { name: 'Vadodara' },
      ]},
      { name: 'Maharashtra', children: [
        { name: 'Pune' }, { name: 'Mumbai' }, { name: 'Nashik' },
      ]},
      { name: 'Karnataka', children: [
        { name: 'Bangalore' }, { name: 'Mysore' },
      ]},
    ]},
  ];

  childrenAccessor = (node: OrgNode) => node.children ?? [];
  hasChild = (_: number, node: OrgNode) => !!node.children?.length;

  readonly expandedNodes = signal<Set<OrgNode>>(new Set());

  toggleNode(node: OrgNode): void {
    this.expandedNodes.update((s) => {
      const next = new Set(s);
      next.has(node) ? next.delete(node) : next.add(node);
      return next;
    });
  }

  isExpanded(node: OrgNode): boolean {
    return this.expandedNodes().has(node);
  }
}
