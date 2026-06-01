import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  {
    path: 'users',
    loadComponent: () => import('../app/features/components/users/users').then((c) => c.Users),
  },
  {
    path: 'directive',
    loadComponent: () =>
      import('../app/features/components/directive/directive').then((c) => c.Directive),
  },
  {
    path: 'pipe',
    loadComponent: () => import('../app/features/components/pipes/pipes').then((c) => c.Pipes),
  },
  {
    path: 'reusable',
    loadComponent: () =>
      import('../app/features/components/resuable/resuable').then((c) => c.Resuable),
  },
  {
    path: 'poets',
    loadComponent: () => import('../app/features/components/poets/poets').then((c) => c.Poets),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('../app/features/components/products/products').then((c) => c.Products),
  },
];
