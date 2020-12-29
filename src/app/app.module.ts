import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent
  ],
  imports: [
    BlockUIModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
