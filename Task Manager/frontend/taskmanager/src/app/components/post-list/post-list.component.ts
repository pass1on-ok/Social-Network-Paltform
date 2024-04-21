import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  //standalone: true,
  //imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts : Post[] = [];
  constructor(private postService: PostService){}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }
}
