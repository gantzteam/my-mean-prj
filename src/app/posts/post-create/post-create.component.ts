import { Component } from '@angular/core'; // EventEmitter, Output // ** เปลี่ยนไปใช้ Service
import { PostsService } from './../posts.service';
import { NgForm } from '@angular/forms';

// import { Post } from '../post.model'; // ** เปลี่ยนไปใช้ Service

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  // @Output() postCreated = new EventEmitter<Post>(); // ** เปลี่ยนไปใช้ Service

  constructor(public postsServcice: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
    // ** เปลี่ยนไปใช้ Service

    // this.postsServcice.addPost(post.title, post.content);
    this.postsServcice.addPost(form.value.title, form.value.content);
  }
}
