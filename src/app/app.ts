import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('interview');

  submitForm() {
    console.log('Button Clicked');
  }
}
