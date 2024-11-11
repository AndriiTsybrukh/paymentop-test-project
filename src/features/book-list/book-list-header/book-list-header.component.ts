import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BookStore } from '../../../data-access/stores/book-store/book-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { BookEditorDialogComponent } from '../book-editor-dialog/book-editor-dialog.component';
import { filter } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ptp-book-list-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './book-list-header.component.html',
  styleUrl: './book-list-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListHeaderComponent implements OnInit {
  private readonly store = inject(BookStore);
  private readonly dialog = inject(MatDialog);

  protected readonly searchValueControl: FormControl<string> =
    new FormControl<string>('', { nonNullable: true });

  public ngOnInit(): void {
    this.searchValueControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.store.updateSearchValue(value));
  }

  public openNewBookDialog(): void {
    const dialogRef = this.dialog.open(BookEditorDialogComponent, {
      width: '600px',
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((book) => {
        console.log(book);

        this.store.createBook(book);
      });
  }
}
