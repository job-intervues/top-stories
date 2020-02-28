import {Component, OnInit} from '@angular/core';
import {PostService} from '../../service/post.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  topStoriesId: any;
  topStories = [];
  startIndex: any;

  constructor(
    private postService: PostService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.postService.getPostList().subscribe((response: any) => {
      this.topStoriesId = response;
      this.startIndex = 0;
      this.loadMorePost();
    });
  }

  gotoCommentSection(item) {
    this.router.navigate(['comments'], {state: item});
  }

  getPostedTime(timeInMillis) {
    const val = moment(timeInMillis, 'YYYYMMDD').fromNow();
    console.log(val);
    return timeInMillis;
  }

  loadMorePost() {
    for (let i = this.startIndex; i < Math.min(this.topStoriesId.length, this.startIndex + 5); i++) {
      const itemId = this.topStoriesId[i];
      this.postService.getPostById(itemId).subscribe((postResponse: any) => {
        this.topStories.push(postResponse);
      });
    }
    this.startIndex = Math.min(this.topStoriesId.length, this.startIndex + 5);
  }
}
