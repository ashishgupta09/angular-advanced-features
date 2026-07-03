import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { AppError, ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error-toast',
  imports: [CommonModule],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.scss',
})
export class ErrorToast implements OnInit, OnDestroy {
  private readonly errorService = inject(ErrorService);
  private subscription = new Subscription();

  currentError: AppError | null = null;
  visible = false;

  ngOnInit(): void {
    // Show toast when a new error arrives, auto-dismiss after 5 seconds
    this.subscription.add(
      this.errorService.error$
        .pipe(filter((error) => error !== null))
        .subscribe((error) => {
          this.currentError = error;
          this.visible = true;
        }),
    );

    this.subscription.add(
      this.errorService.error$
        .pipe(
          filter((error) => error !== null),
          switchMap(() => timer(5000)),
        )
        .subscribe(() => this.dismiss()),
    );
  }

  dismiss(): void {
    this.visible = false;
    // Small delay before clearing so the fade-out animation can finish
    setTimeout(() => {
      this.errorService.clearError();
      this.currentError = null;
    }, 300);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
