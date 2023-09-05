import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/recipes/recipe.model';

export const setRecipes = '[Recipe] set recipes';
export const addRecipe = '[Recipe] add recipe';
export const updateRecipe = '[Recipe] update recipe';
export const deleteRecipe = '[Recipe] delete recipe';
export const fetchRecipe = '[Recipe] fetch recipe';
export const fetchRecipeSuccess = '[Recipe] fetch recipe success';
export const saveRecipe = '[Recipe] save recipes';

export const SET_RECIPES = createAction(
  setRecipes,
  props<{ recipes: Recipe[] }>()
);
export const ADD_RECIPE = createAction(addRecipe, props<{ recipe: Recipe }>());
export const UPDATE_RECIPE = createAction(
  updateRecipe,
  props<{ index: number; recipe: Recipe }>()
);
export const DELETE_RECIPE = createAction(
  deleteRecipe,
  props<{ index: number }>()
);
export const FETCH_RECIPE = createAction(fetchRecipe);
export const FETCH_RECIPE_SUCCESS = createAction(
  fetchRecipeSuccess,
  props<{ recipes: Recipe[] }>()
);
export const SAVE_RECIPE = createAction(saveRecipe);
