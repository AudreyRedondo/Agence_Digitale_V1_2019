import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ServiceComponent } from './components/content/services/service.component';

const routes: Routes = [
  { path: 'presentation', component: PresentationComponent },
  { path: 'service/:id', component: ServiceComponent },
  {
    path: '',
    redirectTo: '/presentation#profil',
    pathMatch: 'full'
  }
  //{ path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports:
    [
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        scrollOffset: [0, 64]
      })
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
