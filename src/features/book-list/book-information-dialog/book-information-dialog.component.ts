import { Component, inject } from '@angular/core';
import { Book } from '../../../data-access/models/book.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ptp-book-information-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './book-information-dialog.component.html',
  styleUrl: './book-information-dialog.component.scss',
})
export class BookInformationDialogComponent {
  protected readonly book: Book = inject<Book>(MAT_DIALOG_DATA);
}
