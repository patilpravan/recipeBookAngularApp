import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopingListService } from '../shoping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  EDIT_MODE_OFF,
  UPDATE_INGREDIENT,
} from 'src/app/store/shoping-list/shoping-list.actions';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css'],
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;
  isEmailSent = false;
  isEmailButtonDisabled = true;
  // subscription: Subscription;
  @ViewChild('ingrdientForm') ingredientForm: NgForm;

  constructor(
    private slService: ShopingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.subscription=this.slService.startEditing.subscribe(index=>{
    //   console.log('editmode',index)
    //   this.editMode=true;
    //   this.editItemIndex=index;
    //   this.editedItem=this.slService.getEditingIngredient(this.editItemIndex);
    //   this.ingredientForm.setValue({name:this.editedItem.name,amount:this.editedItem.amount})
    // })

    this.store.select('shopingListState').subscribe((slState) => {
      console.log('slState', slState);
      this.isEmailButtonDisabled =
        slState.ingredients.length > 0 ? false : true;
      this.editMode = slState.editMode;
      this.editItemIndex = slState.editItemIndex;
      this.editedItem =
        this.editItemIndex > -1
          ? slState.ingredients[this.editItemIndex]
          : null;
      console.log('editeditm', this.editedItem);
      if (this.editMode && slState.ingredients.length > 0) {
        this.ingredientForm.form.patchValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    });
  }
  onIngredientAdded(ingrdientForm: NgForm) {
    const ingrdientFormValue = ingrdientForm.value;
    const newIngredient = new Ingredient(
      ingrdientFormValue.name,
      ingrdientFormValue.amount
    );
    // console.log('update',newIngredient,this.editMode,this.editItemIndex)
    if (this.editMode) {
      // this.slService.updatIngredient(this.editItemIndex, newIngredient);
      // this.editMode = false;
      this.store.dispatch(
        UPDATE_INGREDIENT({
          index: this.editItemIndex,
          ingredient: newIngredient,
        })
      );
      this.store.dispatch(EDIT_MODE_OFF());
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(ADD_INGREDIENT({ ingredient: newIngredient }));
    }
    this.ingredientForm.reset();
  }
  onDeleteButtonClicked() {
    if (this.editMode) {
      this.store.dispatch(DELETE_INGREDIENT({ index: this.editItemIndex }));
      this.store.dispatch(EDIT_MODE_OFF());
      this.ingredientForm.reset();
      // this.slService.deleteIngredient(this.editItemIndex);
      // this.ingredientForm.reset();
      // this.editMode = false;
    }
  }
  onClearButtonClicked() {
    this.ingredientForm.reset();
    this.store.dispatch(EDIT_MODE_OFF());
    // this.editMode = false;
  }
  onEmailMeButtonClicked() {
    this.isEmailSent = true;
  }
  onEmailSentDialogClose() {
    this.isEmailSent = false;
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
