import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule,MatSidenavModule,MatPaginatorModule,
  MatToolbarModule,MatIconModule, MatButtonModule,
  MatListModule,MatMenuModule , MatTableModule,
   MatSortModule,MatFormFieldModule, MatInputModule,
   MatProgressBarModule, MatCheckboxModule, MatProgressSpinnerModule
   , MatCardModule, MatSelectModule,MatExpansionModule,
   MatDatepickerModule, MatNativeDateModule,MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   MatTabsModule,
   MatSidenavModule,
   MatToolbarModule,
   MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
     MatTableModule, 
     MatSortModule,
     MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      MatProgressBarModule,
       MatCheckboxModule,
        MatProgressSpinnerModule , 
        MatCardModule,
         MatSelectModule,
         MatExpansionModule,
         MatDatepickerModule, 
         MatNativeDateModule,
         MatDialogModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
     MatButtonModule,
     MatListModule,
     MatMenuModule,
      MatTableModule,
       MatSortModule,
       MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressBarModule,
         MatCheckboxModule,
          MatProgressSpinnerModule ,
           MatCardModule,
            MatSelectModule,
            MatExpansionModule,
            MatDatepickerModule,
             MatNativeDateModule,
             MatDialogModule
  ],
})
export class MaterialModule { }
