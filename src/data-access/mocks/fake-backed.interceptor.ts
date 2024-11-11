import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Book, BookId } from '../models/book.model';
import { generateBookList } from './book-list-generator';

let BOOK_LIST: Book[] = generateBookList(11);
const SUCCES_RESPONSE: HttpResponse<unknown> = new HttpResponse({
  status: 200,
});

function getBooList(searchValue: string): Observable<HttpResponse<Book[]>> {
  const lowercaseSearchValue = searchValue?.toLowerCase();
  const response = new HttpResponse({
    status: 200,
    body: !searchValue
      ? BOOK_LIST
      : BOOK_LIST.filter((book) =>
          book.name.toLowerCase().includes(lowercaseSearchValue),
        ),
  });
  return of(response).pipe(delay(500));
}

function deleteBook(id: BookId): Observable<HttpResponse<unknown>> {
  BOOK_LIST = BOOK_LIST.filter((book) => book.id !== id);
  return of(SUCCES_RESPONSE).pipe(delay(500));
}

function createBook(book: Book): Observable<HttpResponse<unknown>> {
  const lastBook = BOOK_LIST.at(-1);
  BOOK_LIST = [
    ...BOOK_LIST,
    {
      ...book,
      id: (lastBook ? lastBook.id + 1 : 0) as BookId,
    },
  ];
  return of(SUCCES_RESPONSE).pipe(delay(500));
}

function updateBook(id: BookId, book: Book): Observable<HttpResponse<unknown>> {
  BOOK_LIST = BOOK_LIST.map((b) => (b.id === id ? { ...book, id } : b));
  return of(SUCCES_RESPONSE).pipe(delay(500));
}

export function fakeBackendInterceptor(
  req: HttpRequest<unknown>,
): Observable<HttpEvent<unknown>> {
  if (req.url.endsWith('/api/books') && req.method === 'GET') {
    return getBooList(req.params.get('search_value') || '');
  }

  if (req.url.endsWith('/api/books') && req.method === 'DELETE') {
    return deleteBook(+req.params.get('id')! as BookId);
  }

  if (req.url.endsWith('/api/books') && req.method === 'POST') {
    return createBook(req.body as Book);
  }

  if (req.url.endsWith('/api/books') && req.method === 'PUT') {
    return updateBook(+req.params.get('id')! as BookId, req.body as Book);
  }

  return of(
    new HttpResponse({
      status: 404,
      body: { result: 'You are using the wrong endpoint' },
    }),
  );
}
