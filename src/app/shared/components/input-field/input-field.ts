import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
})
export class InputField {
  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  type = 'text';

  @Input()
  control!: FormControl;
}
