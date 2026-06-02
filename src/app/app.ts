import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Layout } from './layout/layout';
import { ToastComponent } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Layout, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly title = signal('interview');

  submitForm() {
    console.log('Button Clicked');
  }
}
