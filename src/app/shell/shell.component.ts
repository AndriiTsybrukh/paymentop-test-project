import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'ptp-shell',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  public readonly isLoading: Signal<boolean>;

  constructor(private readonly loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading;
  }
}
