import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { FETCH_RECIPE } from '../store/recipes/recipes.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(FETCH_RECIPE());
  }
}
