import { Tagged } from 'type-fest';

export type BookId = Tagged<number, 'id', Book>;

export interface Book {
  id: BookId;
  name: string;
  author: string;
  year: number;
  image: string | ArrayBuffer;
  description: string;
}
