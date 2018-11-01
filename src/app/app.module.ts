import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AllPostsComponent } from './components/all-posts/all-posts.component';

import { PostsService } from './services/posts.service';
import { SimpleModalModule } from 'ngx-simple-modal';
import { PostModalComponent } from './components/post-modal/post-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    PostModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SimpleModalModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent],
  exports: [ SimpleModalModule ],
  entryComponents:[PostModalComponent]
})
export class AppModule { }
