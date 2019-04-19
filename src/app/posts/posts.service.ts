import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}
  getPosts() {
    // return this.posts;
    // ... => Spread Operator
    // [...this.posts] => Copy array (Immutable) จากต้นทาง -> ไปอาเรย์ใหม่ โดยเมื่อมีการแก้ไขอาเรย์ จะไม่ส่งผลกระทบกับอาเรย์ต้นทาง
    // console.log('Not use Spread= ' + this.posts);
    // console.log('Use Spread= ' + [...this.posts]);
    // return [...this.posts]; // ** เปลี่ยนไปใช้ HttpClient
    // return this.posts;

    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
