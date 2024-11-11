import {
  ChangeDetectionStrategy,
  Component,
  model,
  ModelSignal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ptp-upload-image',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadImageComponent {
  public readonly file: ModelSignal<string | ArrayBuffer | null> = model<
    string | ArrayBuffer | null
  >(null);

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) {
      this.file.set(null);
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.file.set(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }
}
