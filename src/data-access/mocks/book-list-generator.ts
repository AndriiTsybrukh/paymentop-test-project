import { Book, BookId } from '../models/book.model';

export const generateBookList: (count: number) => Book[] = (count) => {
  return Array.from(Array(count).keys()).map((id) => ({
    id: id as BookId,
    name: `Book ${id + 1}`,
    year: 2009,
    author: `Book Author ${id + 1}`,
    image: 'images/book-image.webp',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  }));
};
