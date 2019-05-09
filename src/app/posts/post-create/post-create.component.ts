import { Component, OnInit } from '@angular/core'; // EventEmitter, Output // ** เปลี่ยนไปใช้ Service
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // NgForm,

import { PostsService } from './../posts.service';
import { Post } from '../post.model';

import { mimeType } from './mime-type.validator';

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
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;
  // @Output() postCreated = new EventEmitter<Post>(); // ** เปลี่ยนไปใช้ Service

  constructor(
    public postsServcice: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
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
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: null
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // console.log(file);
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    // console.log(file);
    // console.log(this.form);
  }

  onSavePost() {
    // form: NgForm
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      console.log('create');
      this.postsServcice.addPost(
        this.form.value.title,
        this.form.value.content
      );
    } else {
      console.log('edit');
      this.postsServcice.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
    // ** เปลี่ยนไปใช้ Service

    // this.postsServcice.addPost(post.title, post.content);
    this.form.reset();
  }
}
