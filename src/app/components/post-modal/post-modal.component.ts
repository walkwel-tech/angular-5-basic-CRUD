import { Component , OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent extends SimpleModalComponent<null, null> implements OnInit {
    
  message:string = "";
  formdata:any = {};
  post;
  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  constructor(private postService: PostsService) {
    super();
  }
  ngOnInit(){
    if(!this.post){
      this.post={
        title : '',
        body : '',
        userId : 1
      };
    }
    this.formdata = this.post;
  }
  submit(){
    if(this.post.id){
      this.update();
    }else{
      this.create();
    }
  }
  update() {
    this.postService.updatePost(this.formdata).subscribe(res => {
      if(res.body) {
        this.result = res.body;
        this.close();
      }
    }, err => {
      console.log(err);
      this.result = null;
      this.message = 'Something went wrong. Please try later';
    });
  }
  create() {
    this.postService.addPost(this.formdata).subscribe(res => {
      if(res.body) {
        this.postForm.reset();
        this.result = res.body;
        this.close();
      }
    }, err => {
      console.log(err);
      this.result = null;
      this.message  = 'Something went wrong. Please try later';
    })
  }

}
