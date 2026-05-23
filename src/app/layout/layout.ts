import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet
  ],
  standalone:true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
