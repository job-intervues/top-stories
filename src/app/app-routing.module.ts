import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from './components/post/post.component';
import {CommentComponent} from './components/comment/comment.component';
import {RouterModule} from '@angular/router';

const routes = [
  {path: '', component: PostComponent},
  {path: 'comments', component: CommentComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
