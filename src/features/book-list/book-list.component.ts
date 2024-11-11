import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { MatButtonModule } from '@angular/material/button';
import { BookStore } from '../../data-access/stores/book-store/book-store';
import { Book } from '../../data-access/models/book.model';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BookListHeaderComponent } from './book-list-header/book-list-header.component';
import { MatDialog } from '@angular/material/dialog';
import { BookDeleteConfirmationDialogComponent } from './book-delete-confirmation-dialog/book-delete-confirmation-dialog.component';
import { filter } from 'rxjs';
import { BookEdit } from './book-editor-dialog/book-editor-dialog.model';
import { BookEditorDialogComponent } from './book-editor-dialog/book-editor-dialog.component';
import { LoaderService } from '../../app/shared/loader/loader.service';
import { BookInformationDialogComponent } from './book-information-dialog/book-information-dialog.component';

@Component({
  selector: 'ptp-book-list',
  standalone: true,
  imports: [
    CommonModule,
    BookListHeaderComponent,
    BookCardComponent,
    MatButtonModule,
  ],
  providers: [BookStore],
  animations: [
    trigger('fadeInFadeOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('300ms ease-in', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  private readonly store = inject(BookStore);
  private readonly dialog = inject(MatDialog);
  private readonly loaderService = inject(LoaderService);

  protected readonly books: Signal<Book[]> = computed(this.store.books);

  protected get emptyListText(): string | null {
    if (this.loaderService.isLoading()) {
      return null;
    }

    return this.store.searchValue()
      ? 'No books with such criteria'
      : 'Book list is empty';
  }

  public onBookDeleteClick(book: Book): void {
    const dialogRef = this.dialog.open<
      BookDeleteConfirmationDialogComponent,
      string
    >(BookDeleteConfirmationDialogComponent, {
      data: book.name,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.store.deleteBook(book.id);
      });
  }

  public onBookEditClick(book: Book): void {
    const dialogRef = this.dialog.open<BookEditorDialogComponent, BookEdit>(
      BookEditorDialogComponent,
      {
        data: book,
        width: '600px',
      },
    );

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((data) => {
        this.store.updateBook({ book: data, id: book.id });
      });
  }

  public onBookClick(book: Book): void {
    this.dialog.open<BookInformationDialogComponent, BookEdit>(
      BookInformationDialogComponent,
      {
        data: book,
        width: '600px',
      },
    );
  }
}
