import { Component, OnInit, Input } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  @Input() selectedPost;
  @Input() $key;

  constructor(private postService: BlogPostService) { }

  ngOnInit() {
  }

  updatePost(postToUpdate, key) {
    this.postService.updatePost(postToUpdate, key);
  }
}
