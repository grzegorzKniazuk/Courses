import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogConfig, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarConfig, MatSnackBarModule, MatToolbarModule } from '@angular/material';

const MAT_DIALOG_GLOBAL_CONFIG: MatDialogConfig = {
  width: '700px',
  disableClose: true,
  hasBackdrop: true,
};

const MAT_SNACKBAR_GLOBAL_CONFIG: MatSnackBarConfig = {
  duration: 2500,
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
};

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  exports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_GLOBAL_CONFIG },
  ]
})
export class MaterialModule { }
