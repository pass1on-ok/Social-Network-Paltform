import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  //standalone: true,
  //imports: [],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number;
  comments: Comment[] = [];
  newCommentBody: string = '';
  

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (this.postId) {
      this.commentService.getAllCommentsForPost(this.postId).subscribe(
        comments => {
          this.comments = comments;
        },
        error => {
          console.error('Error loading comments:', error);
        }
      );
    }
  }
/*
  createComment(): void {
    if (this.newCommentBody.trim() === '') {
      return;
    }
    this.commentService.createComment(this.postId, this.newCommentBody)
      .subscribe(
        (comment: Comment) => {
          this.comments.push(comment);
          this.newCommentBody = ''; // Очистка поля ввода
        },
        error => {
          console.error('Error creating comment:', error);
        }
      );
  }
*/

/*
  createComment() {
    this.commentService.createComment(this.postId, this.newCommentBody)
      .subscribe(
        (comment) => {
          console.log('Comment created:', comment);
          // Очистить поле ввода после успешного создания комментария
          this.newCommentBody = '';
        },
        (error) => {
          console.error('Error creating comment:', error);
        }
      );
  }
*/
/*
createComment(): void {
    const postId = 27; // Замените на актуальный postId
    const newComment: Comment = {
      id: 0,
      user_id: 1, // Замените на актуальный userId
      post_id: postId,
      
    date: new Date(),
      body: this.newCommentBody
    };

    this.commentService.createComment(newComment)
      .subscribe(
        response => {
          console.log('Comment created:', response);
          // Очистить поле ввода комментария после успешного создания
          this.newCommentBody = '';
        },
        error => {
          console.error('Error creating comment:', error);
        }
      );
  }
  */
}