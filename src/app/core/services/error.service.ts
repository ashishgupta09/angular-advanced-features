import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppError {
  message: string;
  statusCode?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly _error$ = new BehaviorSubject<AppError | null>(null);

  readonly error$: Observable<AppError | null> = this._error$.asObservable();

  setError(message: string, statusCode?: number): void {
    this._error$.next({
      message,
      statusCode,
      timestamp: new Date(),
    });
  }

  clearError(): void {
    this._error$.next(null);
  }
}
