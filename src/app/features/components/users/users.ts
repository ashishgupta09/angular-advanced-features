import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Crud } from '../../../core/services/crud';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(Crud);
  private destroyRef = inject(DestroyRef);
  users = signal<User[]>([]);
  isEditMode = signal(false);
  selectedUserId = signal<string | null>(null);

  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    age: [0, Validators.required],
    role: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getUsers();
  }

  // GET USERS
  getUsers() {
    this.service.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.users.set(res);
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  // ADD/UPDATE USERS

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.userForm.getRawValue(),
      gender: 'male',
      username: 'demo',
      password: '123456',
      maidenName: '',
      birthDate: '',
      image: '',
      bloodGroup: '',
      height: 0,
      weight: 0,
      eyeColor: '',
      hair: {
        color: '',
        type: '',
      },
      ip: '',
      address: {
        address: '',
        city: '',
        state: '',
        stateCode: '',
        postalCode: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
        country: '',
      },
      macAddress: '',
      university: '',
      bank: {
        cardExpire: '',
        cardNumber: '',
        cardType: '',
        currency: '',
        iban: '',
      },
      company: {
        department: '',
        name: '',
        title: '',
        address: {
          address: '',
          city: '',
          state: '',
          stateCode: '',
          postalCode: '',
          coordinates: {
            lat: 0,
            lng: 0,
          },
          country: '',
        },
      },
      ein: '',
      ssn: '',
      userAgent: '',
      crypto: {
        coin: '',
        wallet: '',
        network: '',
      },
    } as User;

    if (this.isEditMode()) {
      this.service.updateUser(this.selectedUserId()!, payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.getUsers();
          this.resetForm();
        },
        error(err) {
          console.log(err);
        },
      });
    } else {
      this.service.addUser(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.getUsers();
          this.resetForm();
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }

  // EDIT USER

  editUser(user: User) {
    this.isEditMode.set(true);
    this.selectedUserId.set(user.id);
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      age: user.age,
      role: user.role,
    });
  }

  // DELETE USER

  deleteUser(id: string) {
    this.service.deleteUser(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.getUsers();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  // RESET

  resetForm() {
    this.isEditMode.set(false);
    this.selectedUserId.set(null);
    this.userForm.reset();
  }
}
