import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class Shop {
  private storageKey = 'products';

  getProducts(): Product[] {
    const products = localStorage.getItem(this.storageKey);
    return products ? JSON.parse(products) : [];
  }

  addProduct(product: Product): void {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
  }

  deleteProduct(id: number): void {
    const filteredProducts = this.getProducts().filter((product) => product.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredProducts));
  }

  getProductById(id: number): Product | undefined {
    return this.getProducts().find((product) => product.id === id);
  }
}
