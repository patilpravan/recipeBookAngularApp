import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  UPDATE_INGREDIENT,
} from '../store/shoping-list/shoping-list.actions';

@Injectable({
  providedIn: 'root',
})
export class ShopingListService {
  // ingredientsChanged = new Subject<Ingredient[]>();
  // startEditing = new Subject<number>();
  // private ingredients: Ingredient[] = [];
  constructor(private store: Store<AppState>) {}

  // getIngredients() {
  //   return this.ingredients.slice();
  // }
  addIngredient(newIngredient: Ingredient) {
    // let isAlreadyExists = false;
    // this.ingredients.map((inggredient, index) => {
    //   if (inggredient.name.toLowerCase() === newIngredient.name.toLowerCase()) {
    //     isAlreadyExists = true;
    //     this.ingredients[index].amount += newIngredient.amount;
    //   }
    // });
    // if (!isAlreadyExists) {
    //   this.ingredients.push(newIngredient);
    // }

    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(ADD_INGREDIENT({ ingredient: newIngredient }));
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // ingredients.map((ing) => {
    //   this.addIngredient(ing);
    // });
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(ADD_INGREDIENTS({ ingredients: ingredients }));
  }
  // getEditingIngredient(index: number) {
  //   return this.ingredients[index];
  // }
  updatIngredient(index: number, newIngredient: Ingredient) {
    // let isAlreadyExists = false;
    // this.ingredients.map((inggredient, index) => {
    //   if (inggredient.name.toLowerCase() === newIngredient.name.toLowerCase()) {
    //     isAlreadyExists = true;
    //   }
    // });
    // if (isAlreadyExists) {
    //   alert('This ingredient is aready exists in Shopping list');
    // } else {
    //   this.ingredients[index] = newIngredient;
    //   this.ingredientsChanged.next(this.ingredients.slice());
    // }
    this.store.dispatch(
      UPDATE_INGREDIENT({ index: index, ingredient: newIngredient })
    );
  }
  deleteIngredient(index: number) {
    // this.ingredients.splice(index, 1);
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(DELETE_INGREDIENT({ index: index }));
  }
}
