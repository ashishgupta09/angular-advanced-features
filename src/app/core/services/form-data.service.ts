import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface FormState {
  personalDetails: PersonalDetails;
  currentStep: number;
}

const STORAGE_KEY = 'multi_step_form_draft';

const INITIAL_STATE: FormState = {
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  currentStep: 1,
};

/**
 * FormDataService — Single source of truth for the multi-step form.
 *
 * Demonstrates two Angular state patterns side-by-side:
 *  1. BehaviorSubject (RxJS) — classic reactive approach, great for async pipelines
 *  2. Signal (Angular 16+)   — fine-grained reactivity, simpler template binding
 *
 * Both are kept in sync so you can compare usage in the components.
 */
@Injectable({ providedIn: 'root' })
export class FormDataService {
  // ── BehaviorSubject approach ──────────────────────────────────────────────
  private readonly _formState$ = new BehaviorSubject<FormState>(
    this._loadFromStorage() ?? { ...INITIAL_STATE },
  );
  readonly formState$ = this._formState$.asObservable();

  // ── Signal approach ───────────────────────────────────────────────────────
  readonly formStateSignal = signal<FormState>(
    this._loadFromStorage() ?? { ...INITIAL_STATE },
  );

  // Derived / computed signal — no manual subscription needed
  readonly fullName = computed(() => {
    const { firstName, lastName } = this.formStateSignal().personalDetails;
    return `${firstName} ${lastName}`.trim();
  });

  readonly currentStep = computed(() => this.formStateSignal().currentStep);

  // ── Mutators ──────────────────────────────────────────────────────────────

  updatePersonalDetails(details: PersonalDetails): void {
    const next: FormState = {
      ...this._formState$.value,
      personalDetails: { ...details },
    };
    this._push(next);
  }

  goToStep(step: number): void {
    const next: FormState = { ...this._formState$.value, currentStep: step };
    this._push(next);
  }

  /**
   * Submit — logs to console and calls optional API.
   * Clears localStorage draft on success.
   */
  submit(): void {
    const state = this._formState$.value;
    console.log('[FormDataService] Submitting form data:', state.personalDetails);
    // TODO: inject HttpClient and POST to API here
    this._clearStorage();
    this.reset();
  }

  reset(): void {
    this._push({ ...INITIAL_STATE });
    this._clearStorage();
  }

  // ── localStorage helpers (Router State demo approach) ─────────────────────

  private _push(state: FormState): void {
    this._formState$.next(state);
    this.formStateSignal.set(state);
    this._saveToStorage(state);
  }

  private _saveToStorage(state: FormState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable (SSR / private browsing) — silently ignore
    }
  }

  private _loadFromStorage(): FormState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as FormState) : null;
    } catch {
      return null;
    }
  }

  private _clearStorage(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
}
