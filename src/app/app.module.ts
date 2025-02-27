import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { MockApiService } from './services/mock-api.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MockApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
