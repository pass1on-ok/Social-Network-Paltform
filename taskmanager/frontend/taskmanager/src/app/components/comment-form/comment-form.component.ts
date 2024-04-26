import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-form',
  
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit {
  @Input() comment: Comment = {
    post_id: 1,
    body: '',
    id: 0,
    user_id: 0,
    date: new Date
  };

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.comment.id) {
      // Update existing comment
      this.commentService.updateComment(this.comment.id, this.comment).subscribe(
        updatedComment => {
          console.log('Comment updated:', updatedComment);
        },
        error => {
          console.error('Error updating comment:', error);
        }
      );
    } else {
      // Create new comment
      this.commentService.createComment(this.comment).subscribe(
        newComment => {
          console.log('Comment created:', newComment);
        },
        error => {
          console.error('Error creating comment:', error);
        }
      );
    }
  }
}