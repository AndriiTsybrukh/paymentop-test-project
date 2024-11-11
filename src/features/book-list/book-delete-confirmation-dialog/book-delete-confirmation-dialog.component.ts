import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ptp-book-delete-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './book-delete-confirmation-dialog.component.html',
  styleUrl: './book-delete-confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDeleteConfirmationDialogComponent {
  protected readonly name = inject<string>(MAT_DIALOG_DATA);
}
