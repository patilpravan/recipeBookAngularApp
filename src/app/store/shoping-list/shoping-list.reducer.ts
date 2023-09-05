import { createReducer, on } from '@ngrx/store';
import { ShopingListState } from '../state/shoping-list.state';
import * as slActions from './shoping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';

const initialShopingListState: ShopingListState = {
  ingredients: [],
  editMode: false,
  editItemIndex: null,
};
export const shopingListReducer = createReducer(
  initialShopingListState,
  on(slActions.ADD_INGREDIENT, (slState, actions) => {
    let isAlreadyExists = false;
    let existingIndex = null;
    slState.ingredients.map((ing, index) => {
      if (ing.name.toLowerCase() === actions.ingredient.name.toLowerCase()) {
        isAlreadyExists = true;
        existingIndex = index;
      }
    });
    if (isAlreadyExists) {
      let updatedIngredients = [...slState.ingredients];
      updatedIngredients[existingIndex] = {
        name: updatedIngredients[existingIndex].name,
        amount:
          updatedIngredients[existingIndex].amount + actions.ingredient.amount,
      };
      return { ...slState, ingredients: updatedIngredients };
    }
    return {
      ...slState,
      ingredients: [...slState.ingredients, actions.ingredient],
    };
  }),
  on(slActions.ADD_INGREDIENTS, (slState, actions) => {
    let updatedIngredients = [...slState.ingredients];
    let isAlreadyExists = false;
    let existingIndex = null;
    actions.ingredients.map((newIng) => {
      slState.ingredients.map((ing, index) => {
        if (ing.name.toLowerCase() === newIng.name.toLowerCase()) {
          isAlreadyExists = true;
          existingIndex = index;
        }
      });
      if (isAlreadyExists) {
        updatedIngredients[existingIndex] = {
          name: updatedIngredients[existingIndex].name,
          amount: updatedIngredients[existingIndex].amount + newIng.amount,
        };
        isAlreadyExists = false;
        existingIndex = null;
      } else {
        updatedIngredients.push(newIng);
      }
    });

    return {
      ...slState,
      ingredients: updatedIngredients,
    };
  }),
  on(slActions.DELETE_INGREDIENT, (slState, actions) => {
    const ingredientsAfterDeletion = slState.ingredients.filter(
      (ing, index) => {
        return index != actions.index;
      }
    );
    return {
      ...slState,
      ingredients: ingredientsAfterDeletion,
    };
  }),
  on(slActions.UPDATE_INGREDIENT, (slState, actions) => {
    let updatedIngredients = [...slState.ingredients];
    updatedIngredients[actions.index] = actions.ingredient;
    return {
      ...slState,
      ingredients: updatedIngredients,
    };
  }),
  on(slActions.EDIT_MODE_ON, (slState, actions) => {
    return {
      ...slState,
      editMode: true,
      editItemIndex: actions.index,
    };
  }),
  on(slActions.EDIT_MODE_OFF, (slState) => {
    return {
      ...slState,
      editItemIndex: null,
      editMode: false,
    };
  }),
  on(slActions.CLEAR_SHOPPINGLIST, (slState) => {
    return {
      ...slState,
      ingredients: [],
    };
  })
);
