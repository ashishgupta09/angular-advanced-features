import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Directive } from './features/components/directive/directive';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    Directive
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('interview');

  submitForm() {
    console.log('Button Clicked');
  }
}
