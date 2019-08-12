import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  postId: string;
  postToDisplay;

  constructor(private route: ActivatedRoute, private location: Location, private postService: BlogPostService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.postId = urlParameters['id'];
    });
    this.postService.getPostById(this.postId).valueChanges().subscribe( data => {
      this.postToDisplay = data;
    });
    console.log(this.postToDisplay)
  }

  updatePost(postToUpdate, key) {
    this.postService.updatePost(postToUpdate, key);
  }
}
