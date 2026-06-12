import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Poet } from '../../../core/services/poet';
import { Post } from '../../../core/interfaces/post';

@Component({
  selector: 'app-poets',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './poets.html',
  styleUrl: './poets.scss',
})
export class Poets implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(Poet);
  private destroyRef = inject(DestroyRef);
  posts = signal<Post[]>([]);
  isEditMode = signal(false);
  seletedPostId = signal<string | null>(null);

  postForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    author: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.service
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.posts.set(res);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  onSubmit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.postForm.getRawValue(),
      createdAt: new Date().toISOString().split('T')[0],
    } as Post;

    if (this.isEditMode()) {
      this.service
        .updatePost(this.seletedPostId()!, payload)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            (this.getPosts(), this.resetForm());
          },
          error(err) {
            console.log(err);
          },
        });
    } else {
      this.service
        .addPost(payload)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            (this.getPosts(), this.resetForm());
          },
          error(err) {
            console.log(err);
          },
        });
    }
  }

  deletePost(id: string) {
    this.service
      .deletePost(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.getPosts();
        },
        error(err) {
          console.log(err);
        },
      });
  }

  editPost(post: Post) {
    this.isEditMode.set(true);
    this.seletedPostId.set(post.id);
    this.postForm.patchValue({
      title: post.title,
      description: post.description,
      author: post.author,
    });
  }

  resetForm() {
    this.isEditMode.set(false);
    this.seletedPostId.set(null);
    this.postForm.reset();
  }
}
