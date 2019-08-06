import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {
  addingPost: boolean;

  constructor(private postService: BlogPostService) { }

  ngOnInit() {
    this.addingPost = false;
  }

  toggleNewPost() {
    if(!this.addingPost) {
      this.addingPost = true;
    } else {
      this.addingPost = false;
    }
  }

  submitPost(title: string, body: string) {
    if (title === '') {
      return alert('Please Enter a Title')
    } else if (body === '') {
      return alert('Please enter a post body')
    } else {
      this.addingPost = false;
      const date = new Date().toDateString()
      let newPost = new BlogPost(title, body, date)
      this.postService.addPost(newPost);
    }

  }

}
