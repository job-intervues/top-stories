import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../service/comment.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  post: any;

  commentsArray = [];

  constructor(
    private router: Router,
    private commentService: CommentService,
    private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    console.log(history.state);
    if (!history.state.id) {
      this.router.navigate(['']);
    }
    this.post = history.state;
    if (this.post.kids) {
      for (const itemId of this.post.kids) {
        this.addToCommentsArray(0, itemId);
      }
    }
  }

  addToCommentsArray(depth, itemId) {
    this.commentService.getCommentById(itemId).subscribe((item: any) => {
      item.depth = depth;
      item.text = this.domSanitizer.bypassSecurityTrustHtml(item.text);
      this.commentsArray.push(item);
      // tslint:disable-next-line:max-line-length
      (document.getElementById('item-' + (this.commentsArray.length - 1).toString()) as HTMLDivElement).style.marginLeft = (depth * 100).toString();
      if (item.kids) {
        for (const childItemId of item.kids) {
          this.addToCommentsArray(depth + 30, childItemId);
        }
      }
    });
  }
}
