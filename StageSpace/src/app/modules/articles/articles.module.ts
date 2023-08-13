import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { BlogComponent } from './components/blog/blog.component';
import { ArticleComponent } from './components/article/article.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    ArticleComponent,
    BlogComponent,
    NewArticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule
  ],
  exports: []
})
export class ArticlesModule { }
