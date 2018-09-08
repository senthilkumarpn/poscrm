import {Router, Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { EventComponent } from './event/event.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { LoginComponent } from './login/login.component';
import {AuthguardService as AuthGuard} from './_guards/authguard.service';
import { RoleguardService as RoleGuard } from './_guards/roleguard.service';
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    {
        path: 'books',
        component: BookComponent,
        canActivate:[AuthGuard],
        data: { title: 'Book List' }
      },
      {
        path: 'book-details/:id',
        canActivate:[AuthGuard],
        component: BookDetailComponent,
        data: { title: 'Book Details' }
      },
      {
        path: 'book-create',
        canActivate:[AuthGuard],
        component: BookCreateComponent,
        data: { title: 'Create Book' }
      },
      {
        path: 'book-edit/:id',
        canActivate:[AuthGuard],
        component: BookEditComponent,
        data: { title: 'Edit Book' }
      },
      {
        path: 'events',
        canActivate:[AuthGuard],
        component: EventComponent,
        data: { title: 'Events Listing' }
      },
      {
        path: 'event/:id',
        canActivate:[AuthGuard],
        component: EventdetailComponent,
        data: { title: 'Event Details' }
      },
     
      {
        path:'userlogin',
        component:LoginComponent,
      },
      { 
      path: '',
      redirectTo: 'userlogin',
      pathMatch: 'full'
      },
      // otherwise redirect to home
      { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);