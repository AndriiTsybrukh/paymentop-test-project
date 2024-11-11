import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TypedFormControls } from '../../../app/shared/models/typed-form-controls.model';
import { BookEdit, DATEPICKER_FORMATS } from './book-editor-dialog.model';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import { UploadImageComponent } from '../../../app/shared/upload-image/upload-image.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ptp-book-editor-dialog',
  standalone: true,
  imports: [
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    UploadImageComponent,
  ],
  providers: [provideMomentDateAdapter(DATEPICKER_FORMATS)],
  templateUrl: './book-editor-dialog.component.html',
  styleUrl: './book-editor-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookEditorDialogComponent implements OnInit {
  public readonly book: BookEdit | null = inject<BookEdit>(MAT_DIALOG_DATA);

  protected readonly form: FormGroup<TypedFormControls<BookEdit>> =
    new FormGroup<TypedFormControls<BookEdit>>({
      name: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      year: new FormControl(null, Validators.required),
      image: new FormControl(''),
      description: new FormControl(''),
    });

  protected get formattedYear(): Date | null {
    return this.form.controls.year.value
      ? new Date(this.form.controls.year.value, 0)
      : null;
  }

  public ngOnInit(): void {
    if (this.book) {
      this.form.patchValue(this.book);
    }
  }

  public updateImage(file: string | ArrayBuffer | null): void {
    this.form.controls.image.setValue(file);
    this.form.markAsDirty();
  }

  protected onYearSelect(
    event: Moment,
    datePicker: MatDatepicker<Moment>,
  ): void {
    this.form.controls.year.setValue(event.year());
    datePicker.close();
  }
}
