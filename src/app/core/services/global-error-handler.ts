import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Use Injector to inject ToastService lazily to avoid circular dependencies in ErrorHandler
  constructor(
    private injector: Injector,
    private zone: NgZone
  ) {}

  handleError(error: any): void {
    // Standard console logging
    console.error('Unhandled Application Error:', error);

    // If the error is an HTTP error, we let the HttpErrorInterceptor handle the toast UI to avoid duplication.
    // We check both instanceof and the 'name' field for robustness in varying environments.
    if (error instanceof HttpErrorResponse || error.name === 'HttpErrorResponse') {
      return;
    }

    // Resolve ToastService from Injector
    const toastService = this.injector.get(ToastService);

    // Run inside NgZone to ensure Angular triggers change detection properly
    this.zone.run(() => {
      let message = 'An unexpected error occurred.';

      if (error instanceof Error) {
        // Client-side JavaScript Runtime Error
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else if (error && error.message) {
        message = error.message;
      }

      // Display the toast message with an error theme
      toastService.error(message);
    });
  }
}
