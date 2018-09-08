import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { EventComponent } from './event/event.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import {MessageService } from './_services/index';
import { LoginComponent } from './login/login.component';
import {PasswordModule,
  InputTextModule,
  PanelModule,ButtonModule
  
  } from 'primeng/primeng';
import { FooterComponent } from './footer/footer.component';
import {AuthService} from './_guards/auth.service';
import {JwtHelperService } from '@auth0/angular-jwt';
import { routing }        from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor,fakeBackendProvider } from './_helpers/intex';
import { JwtModule } from '@auth0/angular-jwt';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    EventComponent,
    EventdetailComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  PasswordModule,
  InputTextModule,
  PanelModule,ButtonModule,
  routing,
  JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
  ],
  providers: [MessageService,AuthService,JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     // provider used to create fake backend
     //fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
