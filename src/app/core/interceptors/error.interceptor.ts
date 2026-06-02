import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  // Clone request to add custom, common headers (e.g. Mock Client Header)
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'X-App-Client': 'AngularAdvancedFeatures',
    },
  });

  return next(modifiedReq).pipe(
    // Retry temporary network errors once before failing
    retry(1),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An HTTP error occurred.';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Connection Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 0:
            errorMessage = 'Network Error: Cannot connect to the server. Please check your internet connection or verify if the mock backend is running.';
            break;
          case 401:
            errorMessage = 'Unauthorized: Access is denied. Please log in again.';
            break;
          case 403:
            errorMessage = 'Forbidden: You do not have permission to access this resource.';
            break;
          case 404:
            errorMessage = `Not Found: The requested resource was not found. (${error.url})`;
            break;
          case 500:
            errorMessage = 'Internal Server Error: Something went wrong on the server.';
            break;
          default:
            errorMessage = `HTTP Error ${error.status}: ${error.statusText || error.message}`;
        }
      }

      // Display the beautiful glassmorphic toast notification
      toastService.error(errorMessage);

      // Re-throw error so the calling component can react (e.g., stop loading spinners)
      return throwError(() => error);
    })
  );
};
