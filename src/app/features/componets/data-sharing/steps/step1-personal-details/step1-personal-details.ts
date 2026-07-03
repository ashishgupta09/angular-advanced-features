import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalDetails } from '../../../../../core/services/form-data.service';

/**
 * Step 1 — Personal Details
 *
 * Data passing technique demonstrated: @Output()
 * This component owns its own FormGroup and emits the validated
 * data up to the parent (MultiStepForm) via an output signal.
 * It does NOT talk to the service directly — the parent decides
 * what to do with the data (service, state, API, etc.).
 */
@Component({
  selector: 'app-step1-personal-details',
  imports: [ReactiveFormsModule],
  templateUrl: './step1-personal-details.html',
  styleUrl: './step1-personal-details.scss',
})
export class Step1PersonalDetails implements OnInit {
  // Angular 17+ output() function — replaces @Output() EventEmitter
  readonly next = output<PersonalDetails>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      phone:     ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,15}$/)]],
    });
  }

  onNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Emit validated data to parent — parent is responsible for persisting it
    this.next.emit(this.form.value as PersonalDetails);
  }

  // Convenience getters for template error access
  get firstName() { return this.form.get('firstName'); }
  get lastName()  { return this.form.get('lastName');  }
  get email()     { return this.form.get('email');     }
  get phone()     { return this.form.get('phone');     }
}
