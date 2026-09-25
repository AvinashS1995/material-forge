import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: 'Dashboard — MaterialForge',
      },

      // Components (showcase overview)
      {
        path: 'components',
        loadComponent: () =>
          import('./features/component-showcase/component-showcase.component').then(
            (m) => m.ComponentShowcaseComponent
          ),
        title: 'Components — MaterialForge',
      },

      // Form Controls
      {
        path: 'components/input',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Input — MaterialForge',
        data: { component: 'input' },
      },
      {
        path: 'components/select',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Select — MaterialForge',
        data: { component: 'select' },
      },
      {
        path: 'components/autocomplete',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Autocomplete — MaterialForge',
        data: { component: 'autocomplete' },
      },
      {
        path: 'components/checkbox',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Checkbox — MaterialForge',
        data: { component: 'checkbox' },
      },
      {
        path: 'components/radio',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Radio — MaterialForge',
        data: { component: 'radio' },
      },
      {
        path: 'components/toggle',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Toggle — MaterialForge',
        data: { component: 'toggle' },
      },
      {
        path: 'components/slider',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Slider — MaterialForge',
        data: { component: 'slider' },
      },
      {
        path: 'components/datepicker',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Datepicker — MaterialForge',
        data: { component: 'datepicker' },
      },
      {
        path: 'components/chips',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'Chips — MaterialForge',
        data: { component: 'chips' },
      },
      {
        path: 'components/file-upload',
        loadComponent: () =>
          import('./features/forms-showcase/forms-showcase.component').then(
            (m) => m.FormsShowcaseComponent
          ),
        title: 'File Upload — MaterialForge',
        data: { component: 'file-upload' },
      },

      // Data
      {
        path: 'components/table',
        loadComponent: () =>
          import('./features/tables-showcase/tables-showcase.component').then(
            (m) => m.TablesShowcaseComponent
          ),
        title: 'Table — MaterialForge',
      },
      {
        path: 'components/list',
        loadComponent: () =>
          import('./features/tables-showcase/tables-showcase.component').then(
            (m) => m.TablesShowcaseComponent
          ),
        title: 'List — MaterialForge',
        data: { component: 'list' },
      },
      {
        path: 'components/tree',
        loadComponent: () =>
          import('./features/tables-showcase/tables-showcase.component').then(
            (m) => m.TablesShowcaseComponent
          ),
        title: 'Tree — MaterialForge',
        data: { component: 'tree' },
      },

      // Navigation
      {
        path: 'components/menu',
        loadComponent: () =>
          import('./features/navigation-showcase/navigation-showcase.component').then(
            (m) => m.NavigationShowcaseComponent
          ),
        title: 'Menu — MaterialForge',
        data: { component: 'menu' },
      },
      {
        path: 'components/tabs',
        loadComponent: () =>
          import('./features/navigation-showcase/navigation-showcase.component').then(
            (m) => m.NavigationShowcaseComponent
          ),
        title: 'Tabs — MaterialForge',
        data: { component: 'tabs' },
      },
      {
        path: 'components/stepper',
        loadComponent: () =>
          import('./features/navigation-showcase/navigation-showcase.component').then(
            (m) => m.NavigationShowcaseComponent
          ),
        title: 'Stepper — MaterialForge',
        data: { component: 'stepper' },
      },
      {
        path: 'components/expansion',
        loadComponent: () =>
          import('./features/navigation-showcase/navigation-showcase.component').then(
            (m) => m.NavigationShowcaseComponent
          ),
        title: 'Expansion Panel — MaterialForge',
        data: { component: 'expansion' },
      },
      {
        path: 'components/breadcrumb',
        loadComponent: () =>
          import('./features/navigation-showcase/navigation-showcase.component').then(
            (m) => m.NavigationShowcaseComponent
          ),
        title: 'Breadcrumb — MaterialForge',
        data: { component: 'breadcrumb' },
      },

      // Surface + Feedback
      {
        path: 'components/:id',
        loadComponent: () =>
          import('./features/feedback-showcase/feedback-showcase.component').then(
            (m) => m.FeedbackShowcaseComponent
          ),
        title: 'Component — MaterialForge',
      },

      // Examples
      {
        path: 'examples/employee',
        loadComponent: () =>
          import('./features/examples/employee/employee-list.component').then(
            (m) => m.EmployeeListComponent
          ),
        title: 'Employee Management — MaterialForge',
      },
      {
        path: 'examples/patient',
        loadComponent: () =>
          import('./features/examples/patient/patient-list.component').then(
            (m) => m.PatientListComponent
          ),
        title: 'Patient Tracking — MaterialForge',
      },
      {
        path: 'examples/sales',
        loadComponent: () =>
          import('./features/examples/sales/sales-dashboard.component').then(
            (m) => m.SalesDashboardComponent
          ),
        title: 'Sales Management — MaterialForge',
      },

      // Settings
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
        title: 'Settings — MaterialForge',
      },
    ],
  },

  // Wildcard
  { path: '**', redirectTo: 'dashboard' },
];
