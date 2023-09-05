import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription, map, take } from 'rxjs';
import { AuthenticateService } from '../auth/authenticate.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { FETCH_RECIPE, SAVE_RECIPE } from '../store/recipes/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated = false;
  shoppingListCartCount = 0;
  messageForEmployer = null;
  constructor(
    private datastorageService: DataStorageService,
    private authService: AuthenticateService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.store.select('shopingListState').subscribe((slState) => {
      this.shoppingListCartCount = slState.ingredients.length;
    });
  }
  onSaveData() {
    this.store.dispatch(SAVE_RECIPE());
    // this.datastorageService.storeRecipes();
  }
  onFetchData() {
    this.store.dispatch(FETCH_RECIPE());
    // this.datastorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logoutUser();
  }
  forEmployerButtonClicked() {
    this.messageForEmployer =
      'Technical Details\n  User Authentication : Login, Sign Up, Auto Login and Auto Logout\n  State management : NgRx\n  Form Features : Error Handling, Reactive Forms, Template Driven Forms, Validations\n  Routing : Auth Guards, Lazy Loading \n  Database : google Firebase \n  Github Repo : asdjasdjksad ';
  }
  onCloseEmployerDialog() {
    this.messageForEmployer = null;
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
