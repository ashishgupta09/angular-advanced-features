import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {}
