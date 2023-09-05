import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ShopingListModule } from './shoping-list/shoping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { shopingListReducer } from './store/shoping-list/shoping-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { recipeReducer } from './store/recipes/recipes.reducer';
import { RecipeEffects } from './store/recipes/recipes.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ShopingListModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot({
      shopingListState: shopingListReducer,
      recipeState: recipeReducer,
    }),
    EffectsModule.forRoot([RecipeEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
