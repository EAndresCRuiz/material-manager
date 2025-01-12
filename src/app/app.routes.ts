import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'materials', pathMatch: 'full' },
  {
    path: 'materials',
    loadChildren: () =>
      import('./materials/materials.routes').then((m) => m.materialRoutes),
  },
  { path: '**', redirectTo: 'materials' },
];
