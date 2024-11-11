import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'book-list',
  },
  {
    path: 'book-list',
    loadComponent: () =>
      import('../features/book-list/book-list.component').then(
        (c) => c.BookListComponent
      ),
  },
];
