import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout{
}