import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post-list',
  //standalone: true,
  //imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  showForm: boolean = false;
  showComments: boolean = false;


  constructor(private postService: PostService,
    private authService: AuthService,
    private userService: UserService,
    
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      data => {
        this.posts = data;
      },
      error => {
        console.error('Error loading posts:', error);
      }
    );
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(
      () => {
        console.log(`Post with ID ${id} has been deleted`);
        
        this.posts = this.posts.filter(post => post.id !== id);
      },
      error => {
        console.error(`Error deleting post with ID ${id}:`, error);
      }
    );
  }

 
  createPost(title: string, content: string, categoryId: string, imagePath: string, rating: string) {
    const currentUser = this.authService.currentUserValue;
    
    const parsedCategoryId = parseInt(categoryId, 10);
    const parsedRating = parseInt(rating, 10);
  
    const newPost: Post = {
      id: 0, 
      user_id: 4, 
      category_id: parsedCategoryId,
      date: new Date(),
      title: title,
      image_path: imagePath,
      rating: parsedRating,
      content: content

    };
  
    this.postService.createPost(newPost)
      .subscribe(
        response => {
          console.log('Post created:', response);
          window.location.reload();
        },
        error => {
          console.error('Error creating post:', error);
        }
      );

  }

  toggleComments(postId: number): void {
    const post = this.posts.find(post => post.id === postId);
    if (post) {
      post.showComments = !post.showComments;
    }
  }
  

  }