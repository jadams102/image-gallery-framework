import { Injectable, Inject } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class BlogPostService {
    blogPosts: AngularFireList<BlogPost>;

    constructor(private database: AngularFireDatabase) {
        this.blogPosts = database.list('blogPosts')
    }

    getPosts() {
        return this.blogPosts;
    }

    addPost(newPost: BlogPost) {
        this.blogPosts.push(newPost);
    }

    getPostById(postId: string) {
        return this.database.object('blogPosts/' + postId)
    }

    updatePost(localUpdatedPost, $key: string) {
        const postEntryInFirebase = this.getPostById($key);
        postEntryInFirebase.update({title: localUpdatedPost.title,
                                    body: localUpdatedPost.body,
                                    date: localUpdatedPost.date})
    }

    deletePost($key: string) {
        const postEntryInFirebase = this.getPostById($key);
        postEntryInFirebase.remove();
    }
}