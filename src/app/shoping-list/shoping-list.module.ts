import { NgModule } from '@angular/core';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { ShopingListComponent } from './shoping-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShopingListComponent, ShopingEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'shoping-list', component: ShopingListComponent },
    ]),
  ],
  exports: [],
})
export class ShopingListModule {}
