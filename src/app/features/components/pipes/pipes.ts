import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../shared/pipes/filter-pipe';
import { InitialsPipe } from '../../../shared/pipes/initials-pipe';
import { MaskEmailPipe } from '../../../shared/pipes/mask-email-pipe';
import { MemoizationPipe } from '../../../shared/pipes/memoization-pipe';
import { PaginationPipe } from '../../../shared/pipes/pagination-pipe';
import { PhonemaskPipe } from '../../../shared/pipes/phonemask-pipe';
import { SafehtmlPipe } from '../../../shared/pipes/safehtml-pipe';
import { ShortnamePipe } from '../../../shared/pipes/shortname-pipe';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago-pipe';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe,
    InitialsPipe,
    MaskEmailPipe,
    MemoizationPipe,
    PaginationPipe,
    PhonemaskPipe,
    SafehtmlPipe,
    ShortnamePipe,
    TimeAgoPipe,
  ],
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss',
})
export class Pipes {
  search = '';
  currentPage = 1;
  itemsPerPage = 3;

  users: User[] = [
    {
      id: 1,
      name: 'Ashish Roy',
      email: 'ashish@gmail.com',
      phone: '9876543210',
    },

    {
      id: 2,
      name: 'John Doe',
      email: 'john@gmail.com',
      phone: '9988776655',
    },
    {
      id: 3,
      name: 'Angular Developer',
      email: 'angular@gmail.com',
      phone: '8899776655',
    },

    {
      id: 4,
      name: 'Frontend Engineer',
      email: 'frontend@gmail.com',
      phone: '7788996655',
    },
    {
      id: 5,
      name: 'Angular Developer',
      email: 'angular@gmail.com',
      phone: '8899776655',
    },

    {
      id: 6,
      name: 'Frontend Engineer',
      email: 'frontend@gmail.com',
      phone: '7788996655',
    },
  ];

  htmlContent = `
    <p style="color:#2563eb">
      Angular Safe HTML Content
    </p>
  `;

  createdAt = new Date(Date.now() - 7200000);
}
