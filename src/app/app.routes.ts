import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('./features/componets/filter/filter').then((m) => m.Filter),
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
    path: 'modal-demo',
    loadComponent: () =>
      import('./features/pages/modal-demo/modal-demo').then((m) => m.ModalDemoPage),
    title: 'Modal Demo',
  },
  {
    path: 'crud',
    loadComponent: () =>
      import('./features/componets/crud-operation/crud-operation').then((m) => m.CrudOperation),
    title: 'Modal Demo',
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];
