import {Routes} from '@angular/router';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CatComponent} from './cat.component';
import {SearchBreedsComponent} from './components/search-breeds/search-breeds.component';
import {VoteComponent} from './components/vote/vote.component';

export const CAT_ROUTES: Routes = [{
  path: 'cat',
  component: CatComponent,
  children: [{
    path: 'search-breeds',
    component: SearchBreedsComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'vote',
    component: VoteComponent,
    canActivate: [AuthGuard]
  }]
}];
