import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Actions, ofType } from '@ngrx/effects';
import { FETCH_RECIPE, SET_RECIPES } from '../store/recipes/recipes.actions';
import { map, of, switchMap, take, withLatestFrom } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[] | Action> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //   const recipes = this.recipesService.getRecipes();
    //   if (recipes.length === 0) {
    //     return this.dataStorageService.fetchRecipes();
    //   } else {
    //     return recipes;
    //   }
    // }
    return this.store.select('recipeState').pipe(
      take(1),
      map((recipeState) => recipeState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(FETCH_RECIPE());
          return this.actions$.pipe(ofType(SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
