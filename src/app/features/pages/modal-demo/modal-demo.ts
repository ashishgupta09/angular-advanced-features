import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal';

/**
 * ModalDemoPage — demonstrates three common modal patterns:
 *
 *  1. Info Modal      — simple message, no footer actions (size: sm)
 *  2. Confirm Modal   — confirm / cancel footer buttons (size: md)
 *  3. Form Modal      — input fields + submit in footer (size: lg)
 */
@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [ModalComponent, FormsModule],
  templateUrl: './modal-demo.html',
  styleUrl: './modal-demo.scss',
})
export class ModalDemoPage {
  // ── Modal visibility ───────────────────────────────────────────────────────
  showInfo    = signal(false);
  showConfirm = signal(false);
  showForm    = signal(false);

  // ── Confirm result ─────────────────────────────────────────────────────────
  confirmResult = signal<string | null>(null);

  onConfirm(): void {
    this.confirmResult.set('Confirmed ✔');
    this.showConfirm.set(false);
  }

  onCancel(): void {
    this.confirmResult.set('Cancelled ✘');
    this.showConfirm.set(false);
  }

  // ── Form modal state ───────────────────────────────────────────────────────
  // Two-way bound with ngModel so they are always in sync
  formName  = '';
  formEmail = '';

  formSubmitted = signal(false);
  formResult    = signal('');

  onFormSubmit(): void {
    if (!this.formName.trim() || !this.formEmail.trim()) return;
    this.formResult.set(`${this.formName} · ${this.formEmail}`);
    this.formSubmitted.set(true);
    this.showForm.set(false);
    // Reset fields for next open
    this.formName  = '';
    this.formEmail = '';
  }
}
