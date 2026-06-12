import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imageUrl: string = '';

}
