import { Routes } from '@angular/router';
import { ListadoComponent } from './pages/post/listado/listado.component';
import { DetailsComponent } from './pages/post/details/details.component';
import { FormPostComponent } from './components/form-post/form-post.component';

export const routes: Routes = [
    { path: '', component: ListadoComponent },
  { path: 'posts', component: ListadoComponent },
   { path: 'post/new', component: FormPostComponent },
//   { path: 'post/edit/:id', component: PostFormComponent },
   { path: 'post/:id', component: DetailsComponent },
  { path: '**', redirectTo: '' }
    
];