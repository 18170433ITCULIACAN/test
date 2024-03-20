import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  posts: Post[] = [];
    

  constructor(public postService: PostService, private router: Router) { }
    

  ngOnInit(): void {
    console.log(this.router.url);
    console.log( window.location.href);
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      console.log(this.posts);
    })  
  }
    

  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.id !== id);
         console.log('Post Eleiminado correctamente');
    })
  }
}