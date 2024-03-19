import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
  
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private router: Router
  ) { }
      

  ngOnInit(): void {
    this.form = new FormGroup({
      nombreCompleto: new FormControl('', [Validators.required]),
      nombreEmpresa: new FormControl('', [Validators.required]),
      inputEmail: new FormControl('', [Validators.required, Validators.email]),
      inputTelefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      inputCategoria: new FormControl('', [Validators.required]),
      inputMensaje: new FormControl('', [Validators.required]),
    });
  }


  get f(){
    return this.form.controls;
  }
      

  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res:any) => {
         console.log('Post Creado Correctamente!');
         this.router.navigateByUrl('post/index');
    })
  }
  
}