import { Component, computed, inject, signal } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { RouterLink } from '@angular/router';
import { Post } from '../../../interfaces/post';
import { SlicePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado',
  imports: [RouterLink,SlicePipe, ReactiveFormsModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

postService=inject(PostService)

postsRs=this.postService.getPostsResource()
query = new FormControl('');

posts: Post[] = [];
  loading = true;
  searchTerm=signal<string | null>('')
  viewMode: 'list' | 'grid' = 'list';

constructor(){
  this.query.valueChanges.subscribe(data=>{
this.searchTerm.set(data)
  })
}

  ngOnInit(): void {
    // this.loadPosts();
  }

  filteredPost=computed(()=>{
    if(this.postsRs.value()){
      return this.postsRs.value()!.filter(post => 
        post.title.toLowerCase().includes(this.searchTerm()!) || 
        post.body.toLowerCase().includes(this.searchTerm()!)
      );
    }else return this.postsRs.value()
  })

  /* loadPosts(): void {
    this.loading = true;
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los posts', err);
        this.loading = false;
      }
    });
  } */

   deletePost(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
      this.loading = true;
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== id);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al eliminar el post', err);
          this.loading = false;
        }
      });
    }
    this.postsRs.reload()
  } 

 /*   filterPosts(event: Event): void {
    console.log(event)
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  } */
/*
  get filteredPosts(): Post[] | undefined {
    if(this.postsRs.value()){
      return this.postsRs.value()!.filter(post => 
        post.title.toLowerCase().includes(this.searchTerm) || 
        post.body.toLowerCase().includes(this.searchTerm)
      );
    }else return this.postsRs.value()
    
  } */

  toggleView(mode: 'list' | 'grid'): void {
    this.viewMode = mode;
  }

}
