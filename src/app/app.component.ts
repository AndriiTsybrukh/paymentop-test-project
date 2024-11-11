import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShellComponent } from './shell/shell.component';

@Component({
  selector: 'ptp-root',
  standalone: true,
  imports: [ShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
