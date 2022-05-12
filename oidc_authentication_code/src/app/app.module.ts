import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AuthService } from 'src/app/services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';



export let InjectorInstance: Injector;

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
   // AuthService
  ],
   
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector){
    InjectorInstance = this.injector;
  }

}
