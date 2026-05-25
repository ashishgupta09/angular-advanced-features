import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input()
  label = 'Submit';

  @Input()
  variant = 'primary';
}
