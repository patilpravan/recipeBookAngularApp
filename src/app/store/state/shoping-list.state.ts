import { Ingredient } from 'src/app/shared/ingredient.model';

export interface ShopingListState {
  ingredients: Ingredient[];
  editMode: boolean;
  editItemIndex: number;
}
