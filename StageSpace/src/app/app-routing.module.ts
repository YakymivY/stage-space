import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { EnterComponent } from './enter/enter.component';
// import { ChatComponent } from './chat/chat.component';
// import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
// import { StartComponent } from './start/start.component';
// import { BlogComponent } from './blog/blog.component';
// import { NewArticleComponent } from './new-article/new-article.component';
// import { ArticleComponent } from './article/article.component';
  
const routes: Routes = [
    // { path: "enter", component: EnterComponent },
    // { path: "chat", component: ChatComponent },
    // { path: "register", component: RegisterComponent },
    // { path: "login", component: LoginComponent },
    // { path: "start", component: StartComponent },
    // { path: "articles", component: BlogComponent },
    // { path: "articles/new", component: NewArticleComponent },
    // { path: "article/:id", component: ArticleComponent },
    ////////
    { path: "articles", 
      loadChildren: () => import('./modules/articles/articles.module').then((m) => m.ArticlesModule) },
    { path: "chatting", 
      loadChildren: () => import('./modules/chatting/chatting.module').then((m) => m.ChattingModule) },
    { path: "auth",
      loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule) },
    { path: "main",
      loadChildren: () => import('./modules/main/main.module').then((m) => m.MainModule) },
    { path: "profile",
      loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule) }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }