import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DialogExampleComponent } from './dialog-example/dialog-example.component'
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [AppComponent, DialogExampleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  entryComponents: [DialogExampleComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
