import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { CommentsService } from '../comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentDto } from '../comment-dto';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  private readonly userService: UserService = inject(UserService)
  private readonly commentService: CommentsService = inject(CommentsService)
  private readonly matSnackBar: MatSnackBar = inject(MatSnackBar)
  
  commentsForm: FormGroup;
  commentsDto: CommentDto[] = []

  @Input()
  videoId: string =''

  constructor(){
    this.commentsForm = new FormGroup({
      comment: new FormControl('comment')
    })

  }
  
  ngOnInit(): void {
    this.getComments()
  }

  getComments(){
    this.commentService.getAllComments(this.videoId).subscribe(data =>{
      this.commentsDto = data
    })
  }

  postComment(){
    const comment = this.commentsForm.get('comment')?.value

    const commentDto = {
      "commentText": comment,
      "authorId": this.userService.getUserId()
    }

    this.commentService.postComment(commentDto, this.videoId).subscribe(() =>{
      this.matSnackBar.open("Comment posted!", "OK")
      
      this.commentsForm.get('comment')?.reset()

      this.getComments()
    })
  }


}
