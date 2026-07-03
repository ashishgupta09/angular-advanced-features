import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/componets/filter/filter').then((m) => m.Filter),
    title: 'User Directory',
  },
  {
    path: 'multi-step-form',
    loadComponent: () =>
      import('./features/componets/data-sharing/multi-step-form/multi-step-form').then(
        (m) => m.MultiStepForm,
      ),
    title: 'Multi-Step Form',
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];
