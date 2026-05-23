import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'directive',
    loadComponent: () =>
      import('../app/features/components/directive/directive').then((c) => c.Directive),
  },
  {
    path: 'pipe',
    loadComponent: () => import('../app/features/components/pipes/pipes').then((c) => c.Pipes),
  },
];
