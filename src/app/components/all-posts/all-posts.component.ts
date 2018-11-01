import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../post';
import { PostModalComponent } from '../post-modal/post-modal.component'
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  public allposts:Post[];
  public message = {
    error : false,
    text : ''
  }
  constructor(private postService: PostsService,private postModalService: SimpleModalService) { }
  
  ngOnInit() {
    this.postService.getAllPosts().subscribe(res => {
      this.allposts = res;
    }, err => {
      console.log(err);
      alert('Something went wrong. Please try later');
    })
  }
  createPost() {
    this.postModalService.addModal(PostModalComponent)
    .subscribe((res) => {
      if(res){
        this.allposts.push(res);
        this.message ={
          error : false,
          text :  'Post added success!!'
        };
      }
  });
  }
  editPost(post) {
    this.postModalService.addModal(PostModalComponent,{ post } )
    .subscribe((res:any) => {
      if(res){
        this.allposts = this.allposts.map(p=>p.id===res.id ? res : p);
        this.message ={
          error : false,
          text : "Post update successfully"
        };
      }
  });
  }
  deletePost(post_id) {

    this.postService.deletePost(post_id).subscribe(res => {
        this.allposts = this.allposts.filter(post => post.id != post_id);
        this.message ={
          error : false,
          text : "Post deleted successfully"
        };
    }, err => {
      console.log(err);
      this.message ={
        error : true,
        text : 'Something went wrong. Please try later'
      };
    })
  }
}
