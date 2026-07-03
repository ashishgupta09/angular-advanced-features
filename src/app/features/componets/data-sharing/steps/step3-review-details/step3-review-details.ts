import { Component, inject, output } from '@angular/core';
import { FormDataService } from '../../../../../core/services/form-data.service';

/**
 * Step 3 — Review Details
 *
 * Data passing techniques demonstrated:
 *  - Shared Service  — reads final state directly from FormDataService
 *  - Signal (computed) — uses formStateSignal and fullName computed signal
 *  - @Output()       — emits submit/back events to parent
 *
 * This component is intentionally read-only — no form, no editing.
 * It reads from the service signal so the parent doesn't need to pass
 * anything down, demonstrating the service-as-shared-state pattern.
 */
@Component({
  selector: 'app-step3-review-details',
  templateUrl: './step3-review-details.html',
  styleUrl: './step3-review-details.scss',
})
export class Step3ReviewDetails {
  // ── Shared Service + Signal ───────────────────────────────────────────────
  private readonly formDataService = inject(FormDataService);

  // Reading via Signal (computed) — no subscription needed
  readonly formState  = this.formDataService.formStateSignal;
  readonly fullName   = this.formDataService.fullName;

  // ── @Output ───────────────────────────────────────────────────────────────
  readonly submit = output<void>();
  readonly back   = output<void>();

  onSubmit(): void {
    this.submit.emit();
  }

  onBack(): void {
    this.back.emit();
  }
}
