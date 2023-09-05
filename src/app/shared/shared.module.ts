import { NgModule } from '@angular/core';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingSpinnerComponent, AlertBoxComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    AlertBoxComponent,
    DropdownDirective,
    CommonModule,
    FormsModule,
  ],
})
export class SharedModule {}
