import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, BookId } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookResourceService {
  private readonly apiUrl = '/api/books';

  constructor(private readonly http: HttpClient) {}

  public getBooks(value: string = ''): Observable<Book[]> {
    const params: HttpParams = new HttpParams().set('search_value', value);
    return this.http.get<Book[]>(this.apiUrl, { params });
  }

  public deleteBook(id: BookId): Observable<Book[]> {
    const params: HttpParams = new HttpParams().set('id', id);
    return this.http.delete<Book[]>(this.apiUrl, { params });
  }

  public createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  public updateBook(id: BookId, book: Book): Observable<Book> {
    const params: HttpParams = new HttpParams().set('id', id);
    return this.http.put<Book>(this.apiUrl, book, { params });
  }
}
