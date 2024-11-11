import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Book, BookId } from '../../models/book.model';
import { BookResourceService } from '../../resources/book-resource.service';
import { withEntities } from '@ngrx/signals/entities';
import {
  catchError,
  debounceTime,
  finalize,
  pipe,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { LoaderService } from '../../../app/shared/loader/loader.service';
import { BooksState, initialState } from './book-store.model';

export const BookStore = signalStore(
  withState<BooksState>(initialState),
  withEntities<Book>(),
  withComputed(({ books }) => ({
    booksCount: computed(() => books().length),
  })),
  withMethods(
    (
      store,
      booksService = inject(BookResourceService),
      loaderService = inject(LoaderService),
    ) => {
      const loadBooks = rxMethod<string | undefined>(
        pipe(
          tap(() => loaderService.showLoader()),
          switchMap((value) =>
            booksService.getBooks(value).pipe(
              tap((books) => {
                patchState(store, { books });
              }),
              finalize(() => {
                loaderService.hideLoader();
              }),
            ),
          ),
        ),
      );

      const deleteBook = rxMethod<BookId>(
        pipe(
          tap(() => loaderService.showLoader()),
          switchMap((id) =>
            booksService.deleteBook(id).pipe(
              tap(() => {
                loadBooks(store.searchValue);
              }),
              catchError((err) => {
                loaderService.hideLoader();
                return throwError(() => err);
              }),
            ),
          ),
        ),
      );

      const createBook = rxMethod<Book>(
        pipe(
          tap(() => loaderService.showLoader()),
          switchMap((book) =>
            booksService.createBook(book).pipe(
              tap(() => {
                loadBooks(store.searchValue);
              }),
              catchError((err) => {
                loaderService.hideLoader();
                return throwError(() => err);
              }),
            ),
          ),
        ),
      );

      const updateBook = rxMethod<{ id: BookId; book: Book }>(
        pipe(
          tap(() => loaderService.showLoader()),
          switchMap(({ id, book }) =>
            booksService.updateBook(id, book).pipe(
              tap(() => {
                loadBooks(store.searchValue);
              }),
              catchError((err) => {
                loaderService.hideLoader();
                return throwError(() => err);
              }),
            ),
          ),
        ),
      );

      const updateSearchValue = rxMethod<string>(
        pipe(
          debounceTime(500),
          tap((searchValue) => {
            patchState(store, { searchValue });
            loadBooks(searchValue);
            loaderService.showLoader();
          }),
        ),
      );

      return {
        loadBooks,
        deleteBook,
        createBook,
        updateBook,
        updateSearchValue,
      };
    },
  ),
  withHooks({
    onInit(store) {
      store.loadBooks(undefined);
    },
  }),
);
