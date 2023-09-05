import { createReducer, on } from '@ngrx/store';
import { RecipeState } from '../state/recipes.state';
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  FETCH_RECIPE,
  FETCH_RECIPE_SUCCESS,
  SAVE_RECIPE,
  SET_RECIPES,
  UPDATE_RECIPE,
} from './recipes.actions';

const initialState: RecipeState = { recipes: [] };
export const recipeReducer = createReducer(
  initialState,
  on(SET_RECIPES, (recipeState, actions) => {
    return {
      ...recipeState,
      recipes: actions.recipes,
    };
  }),
  on(ADD_RECIPE, (recipeState, actions) => {
    return {
      ...recipeState,
      recipes: [...recipeState.recipes, actions.recipe],
    };
  }),
  on(UPDATE_RECIPE, (recipeState, actions) => {
    let updatedRecipes = recipeState.recipes.slice();
    updatedRecipes[actions.index] = actions.recipe;
    return {
      ...recipeState,
      recipes: updatedRecipes,
    };
  }),
  on(DELETE_RECIPE, (recipeState, actions) => {
    const updatedRecipesAfterDelete = recipeState.recipes.filter(
      (recipe, index) => {
        return index != actions.index;
      }
    );
    return {
      ...recipeState,
      recipes: updatedRecipesAfterDelete,
    };
  }),
  on(FETCH_RECIPE, (recipeState) => {
    return {
      ...recipeState,
    };
  }),
  on(FETCH_RECIPE_SUCCESS, (recipeState, actions) => {
    return {
      ...recipeState,
      recipes: actions.recipes,
    };
  }),
  on(SAVE_RECIPE, (recipeState) => {
    return {
      ...recipeState,
    };
  })
);
