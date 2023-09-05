import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = '[shopingList] add ingredient';
export const addIngredients = '[shopingList] add ingredients';
export const deleteIngredient = '[shopingList] delete ingredient';
export const updateIngredient = '[shopingList] update ingredient';
export const editModeOn = '[shopingList] edit mode on';
export const editModeOff = '[shopingList] edit mode off';
export const clearShoppingList = '[shopingList] clear';

export const ADD_INGREDIENT = createAction(
  addIngredient,
  props<{ ingredient: Ingredient }>()
);
export const ADD_INGREDIENTS = createAction(
  addIngredients,
  props<{ ingredients: Ingredient[] }>()
);
export const DELETE_INGREDIENT = createAction(
  deleteIngredient,
  props<{ index: number }>()
);
export const UPDATE_INGREDIENT = createAction(
  updateIngredient,
  props<{ index: number; ingredient: Ingredient }>()
);
export const EDIT_MODE_ON = createAction(
  editModeOn,
  props<{ index: number }>()
);
export const EDIT_MODE_OFF = createAction(editModeOff);

export const CLEAR_SHOPPINGLIST = createAction(clearShoppingList);
