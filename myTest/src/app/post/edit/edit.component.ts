import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
  
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  
  id!: number;
  post!: Post;
  form!: FormGroup;
      

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
      

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post)=>{
      this.post = data;
    }); 
        
    this.form = new FormGroup({
      nombreCompleto: new FormControl('', [Validators.required]),
      nombreEmpresa: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      categoria: new FormControl('', [Validators.required]),
      mensaje: new FormControl('', [Validators.required]),
    });
  }
      

  get f(){
    return this.form.controls;
  }
      

  submit(){
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Post actualizado correctamente!');
         this.router.navigateByUrl('post/index');
    })
  }
  
}