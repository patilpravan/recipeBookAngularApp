import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  FETCH_RECIPE,
  FETCH_RECIPE_SUCCESS,
  SAVE_RECIPE,
  SET_RECIPES,
} from './recipes.actions';
import {
  exhaustMap,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/recipes/recipe.model';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private dataStorageService: DataStorageService,
    private store: Store<AppState>,
    private http: HttpClient
  ) {}
  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FETCH_RECIPE),
      exhaustMap((action) =>
        this.http
          .get<Recipe[]>(
            'https://angularrecipebook-29766-default-rtdb.firebaseio.com/recipes.json'
          )
          .pipe(
            map((recipes) => {
              return recipes.map((recipe) => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : [],
                };
              });
            }),
            tap((recipes) => {
              // this.recipeService.setRecipes(recipes);
              this.store.dispatch(SET_RECIPES({ recipes: recipes }));
            }),
            map((rec) => FETCH_RECIPE_SUCCESS({ recipes: rec }))
          )
      )
    );
  });
  saveRecipes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SAVE_RECIPE),
        withLatestFrom(this.store.select('recipeState')),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            'https://angularrecipebook-29766-default-rtdb.firebaseio.com/recipes.json',
            recipesState.recipes
          );
        })
      );
    },
    { dispatch: false }
  );
}
