import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // return this.posts;

    // ... => Spread Operator
    // [...this.posts] => Copy array (Immutable) จากต้นทาง -> ไปอาเรย์ใหม่ โดยเมื่อมีการแก้ไขอาเรย์ จะไม่ส่งผลกระทบกับอาเรย์ต้นทาง
    console.log('Not use Spread= ' + this.posts);
    console.log('Use Spread= ' + [...this.posts]);

    return [...this.posts];
    // return this.posts;
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
