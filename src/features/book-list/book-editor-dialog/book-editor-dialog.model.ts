import { Book } from '../../../data-access/models/book.model';

export type BookEdit = Omit<Book, 'id'>;

export const DATEPICKER_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
