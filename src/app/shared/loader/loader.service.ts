import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public readonly isLoading: Signal<boolean>;

  private readonly _isLoading: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    this.isLoading = this._isLoading.asReadonly();
  }

  public showLoader(): void {
    this._isLoading.set(true);
  }

  public hideLoader(): void {
    this._isLoading.set(false);
  }
}
