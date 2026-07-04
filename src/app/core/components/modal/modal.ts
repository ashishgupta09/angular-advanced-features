import {
  Component,
  input,
  output,
  ContentChild,
  TemplateRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ModalComponent — Reusable, fully accessible modal dialog.
 *
 * Usage:
 *   <app-modal [isOpen]="showModal" title="My Title" (closed)="showModal = false">
 *     <ng-template #modalBody>
 *       <p>Any content goes here</p>
 *     </ng-template>
 *     <ng-template #modalFooter>
 *       <button (click)="showModal = false">Cancel</button>
 *       <button (click)="onConfirm()">Confirm</button>
 *     </ng-template>
 *   </app-modal>
 *
 * Inputs:
 *   isOpen  — controls visibility
 *   title   — header text
 *   size    — 'sm' | 'md' | 'lg'  (default: 'md')
 *
 * Outputs:
 *   closed  — emits when the user closes via X button, backdrop click, or Escape
 *
 * Content slots (ng-template with template reference variables):
 *   #modalBody   — required  — the main content area
 *   #modalFooter — optional  — action buttons row
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  // ── Inputs ────────────────────────────────────────────────────────────────
  readonly isOpen = input<boolean>(false);
  readonly title  = input<string>('');
  readonly size   = input<'sm' | 'md' | 'lg'>('md');

  // ── Outputs ───────────────────────────────────────────────────────────────
  readonly closed = output<void>();

  // ── Content projection ────────────────────────────────────────────────────
  @ContentChild('modalBody')   bodyTpl!:   TemplateRef<unknown>;
  @ContentChild('modalFooter') footerTpl?: TemplateRef<unknown>;

  // ── Close handlers ────────────────────────────────────────────────────────
  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    // Only close when the backdrop itself is clicked, not the dialog panel
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
