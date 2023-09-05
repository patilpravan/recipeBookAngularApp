import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from '../shoping-list/shoping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  // recipesChanged = new Subject<Recipe[]>();
  // private recipes = [];
  constructor(private slService: ShopingListService) {}
  // setRecipes(recipes: Recipe[]) {
  //   this.recipes = recipes;
  //   this.recipesChanged.next(this.getRecipes());
  // }
  // getRecipe(index: number) {
  //   return this.recipes[index];
  // }
  // getRecipes() {
  //   return this.recipes.slice();
  // }
  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   this.slService.addIngredientsToShoppingList(ingredients);
  // }
  // updateRecipes(index: number, newRecipe: Recipe) {
  //   this.recipes[index] = newRecipe;
  //   this.recipesChanged.next(this.getRecipes());
  // }
  // addRecipe(newRecipe: Recipe) {
  //   this.recipes.push(newRecipe);
  //   this.recipesChanged.next(this.getRecipes());
  // }
  // deleteRecipe(index: number) {
  //   this.recipes.splice(index, 1);
  //   this.recipesChanged.next(this.getRecipes());
  // }
}
