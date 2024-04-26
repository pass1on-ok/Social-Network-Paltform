import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-category-list',
  //standalone: true,
  //imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  selectedCategory: Category | null = null;
  posts: Post[] = [];

  constructor(private categoryService: CategoryService, private postService: PostService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    if (category) {
      this.postService.getPostsByCategory(category.id).subscribe(
        data => {
          this.posts = data;
        },
        error => {
          console.error('Error fetching posts for category:', error);
        }
      );
    } else {
      this.posts = [];
    }
  }
}