import { Book } from '../../models/book.model';

export type BooksState = {
  books: Book[];
  searchValue: string;
};

export const initialState: BooksState = {
  books: [],
  searchValue: '',
};
