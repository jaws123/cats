import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatComponent } from './cat.component';
import { RouterModule } from '@angular/router';
import { VoteComponent } from './components/vote/vote.component';
import { SearchBreedsComponent } from './components/search-breeds/search-breeds.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CAT_ROUTES } from './cat.routes';


@NgModule({
  declarations: [CatComponent, VoteComponent, SearchBreedsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CAT_ROUTES)
  ]
})
export class CatModule { }
