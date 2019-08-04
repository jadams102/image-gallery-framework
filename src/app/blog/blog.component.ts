import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../models/blog-post.model';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { SeoService } from '../services/seo.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: BlogPost[];
  user: Observable<firebase.User>
  keys: String[];

  constructor(private authService: AuthenticationService, private postService: BlogPostService, private router: Router, private seo: SeoService) { }
  
  ngOnInit() {
    this.postService.getPosts().valueChanges().subscribe(data => {
      this.postService.getPosts().snapshotChanges().pipe(
        map(actions => actions.map(a=> ({key: a.key}))
        )).subscribe(keys => {
          this.keys = keys.map(item => item.key).reverse();
          this.posts = data.reverse();
        })
      })
    this.user = this.authService.authUser();

    this.seo.generateTags({
      title: 'Blog Page', 
      description: 'This page has a blog on it', 
      image: 'https://instafire-app.firebaseapp.com/assets/meerkat.jpeg',
      slug: 'blog'
    })
  }

  goToDetailPage(clickedPost) {
    this.router.navigate(['blog', clickedPost.$key]);
  }

  deletePost(post) {
    this.postService.deletePost(post);
  }
    

}

