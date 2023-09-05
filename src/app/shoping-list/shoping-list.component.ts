import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from './shoping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { EDIT_MODE_ON } from '../store/shoping-list/shoping-list.actions';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients$: Ingredient[];
  // igChangedSub: Subscription;
  constructor(
    private slService: ShopingListService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    // this.ingredients = this.slService.getIngredients();
    // this.igChangedSub = this.slService.ingredientsChanged.subscribe(
    //   (ingredients) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.store.select('shopingListState').subscribe((slState) => {
      this.ingredients$ = slState.ingredients;
    });
  }
  onIngredientClicked(currentIndex: number) {
    // this.slService.startEditing.next(index);
    this.store.dispatch(EDIT_MODE_ON({ index: currentIndex }));
  }
  ngOnDestroy(): void {
    // this.igChangedSub.unsubscribe();
  }
}
