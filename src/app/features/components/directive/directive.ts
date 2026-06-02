import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Debounceclick } from '../../../shared/directives/debounceclick';
import { Disablebutton } from '../../../shared/directives/disablebutton';
import { Highlight } from '../../../shared/directives/highlight';
import { Role } from '../../../shared/directives/role';
import { Skeleton } from '../../../shared/directives/skeleton';
import { Tooltip } from '../../../shared/directives/tooltip';
import { Autofocus } from '../../../shared/directives/autofocus';
import { Onlynumber } from '../../../shared/directives/onlynumber';
import { Infinitescroll } from '../../../shared/directives/infinitescroll';

@Component({
  selector: 'app-directive',
  imports: [
    CommonModule,
    FormsModule,
    Highlight,
    Disablebutton,
    Debounceclick,
    Skeleton,
    Tooltip,
    Role,
    Autofocus,
    Onlynumber,
    Infinitescroll,
  ],
  standalone: true,
  templateUrl: './directive.html',
  styleUrl: './directive.scss',
})
export class Directive implements OnInit {
  username = '';
  mobileNumber = '';
  count = 0;
  loading = true;
  items: string[] = [];

  users = [
    {
      name: 'Ashish Roy',
      email: 'ashish@gmail.com',
    },
    {
      name: 'John Doe',
      email: 'john@gmail.com',
    },
  ];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.cd.markForCheck();
    }, 3000);
    this.loadData();
  }

  submitForm() {
    console.log('Button Clicked');
  }

  login() {
    console.log(this.username);
  }

  mobile() {
    console.log(this.mobileNumber);
  }

  handleClick() {
    this.count++;
    console.log('API Called', this.count);
  }

  loadData() {
    const start = this.items.length + 1;
    for (let i = start; i < start + 5; i++) {
      this.items.push(`Angular Item ${i}`);
    }
  }

  onScrollDown() {
    console.log('Loading More Data...');
    this.loadData();
  }

}
