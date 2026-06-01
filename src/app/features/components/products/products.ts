import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../core/interfaces/product';
import { Shop } from '../../../core/services/shop';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private service = inject(Shop);
  private fb = inject(FormBuilder);
  products: Product[] = [];
  editId: number | null = null;

  productForm = this.fb.group({
    productName: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.editId) {
      const updateProduct: Product = {
        id: this.editId,
        ...this.productForm.getRawValue(),
        createdAt: new Date().toISOString(),
      } as unknown as Product;

      this.service.updateProduct(updateProduct);
      this.editId = null;
    } else {
      const addProduct: Product = {
        id: Date.now(),
        ...this.productForm.getRawValue(),
        createdAt: new Date().toISOString(),
      } as unknown as Product;
      this.service.addProduct(addProduct);
    }

    this.loadProducts();
    this.productForm.reset();
  }

  editProduct(product: Product): void {
    this.editId = product.id;

    this.productForm.patchValue({
      productName: product.productName,
      description: product.description,
      price: product.price as any,
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Delete this post?')) {
      this.service.deleteProduct(id);
      this.loadProducts();
    }
  }

  resetForm(): void {
    this.productForm.reset();
    this.editId = null;
  }

  isEditMode(): boolean {
    return this.editId !== null;
  }
}
