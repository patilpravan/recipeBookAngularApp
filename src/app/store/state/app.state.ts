import { RecipeState } from './recipes.state';
import { ShopingListState } from './shoping-list.state';

export interface AppState {
  shopingListState: ShopingListState;
  recipeState: RecipeState;
}
