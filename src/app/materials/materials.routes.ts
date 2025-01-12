import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

export const materialRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: FormComponent },
  { path: 'edit/:id', component: FormComponent },
];
