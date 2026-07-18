import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../../../core/services/crud-service';
import { UserClone } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-crud-operation',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crud-operation.html',
  styleUrl: './crud-operation.scss',
})
export class CrudOperation implements OnInit {
  private readonly service = inject(CrudService);
  private readonly fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  users = signal<UserClone[]>([]);
  isEditMode = signal(false);
  selectedUserId = signal<string | null>(null);

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          this.users.set(value);
        },
        error(err) {
          console.log(err); 
        },
      });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.userForm.value.name,
      email:this.userForm.value.email,
      password: this.userForm.value.password,
      phone:this.userForm.value.phone,
      city:this.userForm.value.city,
      country:this.userForm.value.country,
    };

    if (this.isEditMode()) {
      this.service
        .updateUser(this.selectedUserId()!, payload as UserClone)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (value) => {
            console.log(value)
            this.getAllUsers();
          },
          error(err) {
            console.log(err);
          },
        });
    } else {
      this.service
        .createUser(payload as UserClone)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.getAllUsers();
            this.resetForm();
          },
          error(err) {
            console.log(err);
          },
        });
    }
  }

  deleteUser(id: string) {
    this.service
      .deleteUser(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.getAllUsers();
        },
        error(err) {
          console.log(err);
        },
      });
  }

  editUser(user: UserClone) {
    this.isEditMode.set(true);
    this.selectedUserId.set(user.id || null);
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      city: user.city,
      country: user.country,
    });
  }

  resetForm() {
    this.isEditMode.set(false);
    this.selectedUserId.set(null);
    this.userForm.reset();
  }
}
