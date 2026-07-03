import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalDetails } from '../../../../../core/services/form-data.service';

/**
 * Step 2 — Edit Details
 *
 * Data passing techniques demonstrated:
 *  - @Input()  — receives existing data from the parent to pre-fill the form
 *  - @Output() — emits updated data back up to parent on Next/Back
 *
 * Uses Angular 17+ input() / output() functions instead of decorators.
 */
@Component({
  selector: 'app-step2-edit-details',
  imports: [ReactiveFormsModule],
  templateUrl: './step2-edit-details.html',
  styleUrl: './step2-edit-details.scss',
})
export class Step2EditDetails implements OnInit {
  // ── @Input — data flows IN from parent ───────────────────────────────────
  // Angular 17+ input() signal — replaces @Input() decorator
  readonly details = input.required<PersonalDetails>();

  // ── @Output — data flows OUT to parent ───────────────────────────────────
  readonly next = output<PersonalDetails>();
  readonly back = output<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const d = this.details();
    this.form = this.fb.group({
      firstName: [d.firstName, [Validators.required, Validators.minLength(2)]],
      lastName:  [d.lastName,  [Validators.required, Validators.minLength(2)]],
      email:     [d.email,     [Validators.required, Validators.email]],
      phone:     [d.phone,     [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,15}$/)]],
    });
  }

  onNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.next.emit(this.form.value as PersonalDetails);
  }

  onBack(): void {
    this.back.emit();
  }

  get firstName() { return this.form.get('firstName')!; }
  get lastName()  { return this.form.get('lastName')!;  }
  get email()     { return this.form.get('email')!;     }
  get phone()     { return this.form.get('phone')!;     }
}
