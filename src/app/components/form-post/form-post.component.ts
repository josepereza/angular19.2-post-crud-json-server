import { Component, computed, effect, inject, input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-form-post',
  imports: [ ReactiveFormsModule, NgClass ],
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.css'
})
export class FormPostComponent {
  postForm!: FormGroup;
  submitted = false;
  success = false;
  id_post=input.required<number>()
  postService=inject(PostService)

  postRs= this.postService.getPostRs(this.id_post)
  mipost=effect(()=>{ this.postForm.patchValue(this.postRs.value() as Post)

  })
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();

   
  }

  initForm(): void {
    this.postForm = this.fb.group({
      userId: [1, [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.postForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    const postData: Post = this.postForm.value;
    console.log('Datos del formulario:', postData);
    
    // Aquí iría la lógica para enviar los datos a un servicio

    if (this.id_post()){

      this.postService.updatePost(this.postForm.value as Post,this.id_post()).subscribe(data=>{
        console.log(data)
      })
    }else {

       this.postService.addPost(postData).subscribe(data=>{
      console.log(data)
    })
    }
   
    
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 3000);
  }

  onReset(): void {
    this.submitted = false;
    this.postForm.reset();
    this.initForm();
  }
}
