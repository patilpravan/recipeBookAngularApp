import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { ADD_INGREDIENTS } from 'src/app/store/shoping-list/shoping-list.actions';
import {
  DELETE_RECIPE,
  SAVE_RECIPE,
} from 'src/app/store/recipes/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipeState');
        }),
        map((recipeState) => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   this.recipe = this.recipesService.getRecipe(this.id);
    // });
  }
  addIngredientsToShoppingList() {
    this.store.dispatch(
      ADD_INGREDIENTS({ ingredients: this.recipe.ingredients })
    );
    // this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.store.dispatch(DELETE_RECIPE({ index: this.id }));
    // this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
    // this.store.dispatch(SAVE_RECIPE());
  }
}
