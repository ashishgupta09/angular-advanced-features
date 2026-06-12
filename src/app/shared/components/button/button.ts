import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() varient: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' = 'primary';

  @Output() clicked = new EventEmitter<void>();

  get buttonClass(): string {
    return `btn btn-${this.varient}`;
  }

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
