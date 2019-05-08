import { Component, OnInit } from '@angular/core'; // EventEmitter, Output // ** เปลี่ยนไปใช้ Service
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PostsService } from './../posts.service';
import { Post } from '../post.model';

// import { Post } from '../post.model'; // ** เปลี่ยนไปใช้ Service

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false;
  private mode = 'create';
  private postId: string;
  // @Output() postCreated = new EventEmitter<Post>(); // ** เปลี่ยนไปใช้ Service

  constructor(
    public postsServcice: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        // postId ชื่อเดียวกับที่ประกาศใน app-routing.module.ts
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        // this.post = this.postsServcice.getPost(this.postId); // เก็บค่าตัวแปร id จาก model
        //
        this.isLoading = true;
        this.postsServcice.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      console.log('create');
      this.postsServcice.addPost(form.value.title, form.value.content);
    } else {
      console.log('edit');
      this.postsServcice.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
    // ** เปลี่ยนไปใช้ Service

    // this.postsServcice.addPost(post.title, post.content);
    form.resetForm();
  }
}
