import { Component, inject } from '@angular/core';
import { FormDataService, PersonalDetails } from '../../../../core/services/form-data.service';
import { Step1PersonalDetails } from '../steps/step1-personal-details/step1-personal-details';
import { Step2EditDetails } from '../steps/step2-edit-details/step2-edit-details';
import { Step3ReviewDetails } from '../steps/step3-review-details/step3-review-details';

/**
 * MultiStepForm — Shell / Orchestrator
 *
 * Responsibilities:
 *  - Tracks the active step
 *  - Passes data DOWN to child steps via @Input()
 *  - Listens to events coming UP from child steps via @Output()
 *  - Persists state to FormDataService (which also syncs localStorage)
 *  - Calls service.submit() on final step
 *
 * This is the "smart" component — all child steps are "dumb" (presentational).
 */
@Component({
  selector: 'app-multi-step-form',
  imports: [Step1PersonalDetails, Step2EditDetails, Step3ReviewDetails],
  templateUrl: './multi-step-form.html',
  styleUrl: './multi-step-form.scss',
})
export class MultiStepForm {
  private readonly formDataService = inject(FormDataService);

  // Read current step from the service signal so it stays in sync with localStorage
  readonly currentStep = this.formDataService.currentStep;

  // Local snapshot of personal details — passed down to Step2 as @Input
  personalDetails: PersonalDetails =
    this.formDataService.formStateSignal().personalDetails;

  submitted = false;

  // ── Step 1 handler ────────────────────────────────────────────────────────
  onStep1Next(details: PersonalDetails): void {
    this.personalDetails = details;
    this.formDataService.updatePersonalDetails(details);
    this.formDataService.goToStep(2);
  }

  // ── Step 2 handlers ───────────────────────────────────────────────────────
  onStep2Next(details: PersonalDetails): void {
    this.personalDetails = details;
    this.formDataService.updatePersonalDetails(details);
    this.formDataService.goToStep(3);
  }

  onStep2Back(): void {
    this.formDataService.goToStep(1);
  }

  // ── Step 3 handlers ───────────────────────────────────────────────────────
  onSubmit(): void {
    this.formDataService.submit();
    this.submitted = true;
  }

  onStep3Back(): void {
    this.formDataService.goToStep(2);
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  onReset(): void {
    this.formDataService.reset();
    this.personalDetails = this.formDataService.formStateSignal().personalDetails;
    this.submitted = false;
  }
}
