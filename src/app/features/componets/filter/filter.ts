import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { USER_INFO } from '../../../shared/constants/user.constants';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter implements OnInit {
  
  readonly userInfo = USER_INFO;
  searchControl = new FormControl('');
  filterUsers$: Observable<User[]> = new Observable();

  ngOnInit(): void {
    this.filterUsers$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map((searchTerm) => this.performSearch(searchTerm || '')),
    );
  }

  private performSearch(term: string): User[] {
    if (!term.trim()) {
      return this.userInfo;
    }

    const lowerTerm = term.toLowerCase();

    return this.userInfo.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm) ||
        user.city.toLowerCase().includes(lowerTerm) ||
        user.country.toLowerCase().includes(lowerTerm) ||
        user.phone.includes(lowerTerm),
    );
  }
}
