import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscriptions: Subscription;
  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    // this.subscriptions = this.recipeService.recipesChanged.subscribe(
    //   (recipes) => {
    //     this.recipes = recipes;
    //   }
    // );
    // this.recipes = this.recipeService.getRecipes();

    this.subscriptions = this.store
      .select('recipeState')
      .subscribe((recipeState) => {
        this.recipes = recipeState.recipes;
        console.log(JSON.stringify(this.recipes));
      });
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
