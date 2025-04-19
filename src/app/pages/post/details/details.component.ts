import { Component, inject, input } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../../interfaces/post';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
id=input.required<number>()
postService=inject(PostService)

post: Post | undefined;
  loading = true;
  error = false;
  relatedPosts: Post[] = [];

postRs=this.postService.getPostRs(this.id)
constructor(
 
  private router: Router
) {}

deletePost(id:number): void {
  
  if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
    this.loading = true;
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        console.error('Error al eliminar el post', err);
        this.loading = false;
      }
    });
  }
}
}
