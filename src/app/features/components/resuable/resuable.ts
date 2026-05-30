import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { InputField } from '../../../shared/components/input-field/input-field';
import { Modal } from '../../../shared/components/modal/modal';
import { Card } from '../../../shared/components/card/card';

@Component({
  selector: 'app-resuable',
  imports: [CommonModule, Modal, Button, InputField, ReactiveFormsModule,Card],
  standalone: true,
  templateUrl: './resuable.html',
  styleUrl: './resuable.scss',
})
export class Resuable {
  isOpen = false;
  private fb = inject(FormBuilder);
  userForm!: FormGroup;
  selectComponent = 'A';

  selectedButton(value:string){
    this.selectComponent = value
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  openModel() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
