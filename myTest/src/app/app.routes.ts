import { Routes } from '@angular/router';
  
import { IndexComponent } from './post/index/index.component';
import { ViewComponent } from './post/view/view.component';
import { CreateComponent } from './post/create/create.component';
import { EditComponent } from './post/edit/edit.component';
import { BienvenidaComponent } from './post/bienvenida/bienvenida.component';

export const routes: Routes = [
      { path: '', redirectTo: 'post/index', pathMatch: 'full'},
      { path: 'post/index', component: IndexComponent },
      { path: 'post/:postId/view', component: ViewComponent },
      { path: 'post/create', component: CreateComponent },
      { path: 'post/:postId/edit', component: EditComponent }, 
      { path: 'bienvenida', component: BienvenidaComponent},

  ];