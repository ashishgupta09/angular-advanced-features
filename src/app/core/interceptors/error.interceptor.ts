import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string;

      switch (error.status) {
        case 0:
          message = 'Network error — please check your internet connection.';
          break;
        case 400:
          message = error.error?.message ?? 'Bad request. Please check your input.';
          break;
        case 401:
          message = 'Unauthorized. Please log in again.';
          break;
        case 403:
          message = 'Forbidden. You do not have permission to perform this action.';
          break;
        case 404:
          message = 'The requested resource was not found.';
          break;
        case 422:
          message = error.error?.message ?? 'Validation failed. Please check your input.';
          break;
        case 500:
          message = 'Internal server error. Please try again later.';
          break;
        case 503:
          message = 'Service unavailable. Please try again later.';
          break;
        default:
          message = error.error?.message ?? `Unexpected error (${error.status}).`;
      }

      errorService.setError(message, error.status);
      return throwError(() => error);
    }),
  );
};
