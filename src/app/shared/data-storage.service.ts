import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthenticateService } from '../auth/authenticate.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { SET_RECIPES } from '../store/recipes/recipes.actions';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthenticateService,
    private store: Store<AppState>
  ) {}
  // storeRecipes(recipes: Recipe[]) {
  //   // const recipes = this.recipeService.getRecipes();
  //   return this.http.put(
  //     'https://angularrecipebook-29766-default-rtdb.firebaseio.com/recipes.json',
  //     recipes
  //   );
  //   // .subscribe((res) => {
  //   //   console.log(res);
  //   // });
  // }
  // fetchRecipes() {
  //   return this.http
  //     .get<Recipe[]>(
  //       'https://angularrecipebook-29766-default-rtdb.firebaseio.com/recipes.json'
  //     )
  //     .pipe(
  //       map((recipes) => {
  //         return recipes.map((recipe) => {
  //           return {
  //             ...recipe,
  //             ingredients: recipe.ingredients ? recipe.ingredients : [],
  //           };
  //         });
  //       }),
  //       tap((recipes) => {
  //         // this.recipeService.setRecipes(recipes);
  //         this.store.dispatch(SET_RECIPES({ recipes: recipes }));
  //       })
  //     );
  // }
}
