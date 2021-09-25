import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module'
import { AppComponent } from './app.component';
import { DogsDetailsDialog } from './components/dogs/dogs-details/dogs-details-dialog.component';
import { reducer } from './components/dogs/store/dogs.reducer';
import { DogsComponent } from './components/dogs/dogs.component';
import { DogsTableComponent } from './components/dogs/dogs-table.component';
import { DogsEffects } from './components/dogs/store/dogs.effects';

@NgModule({
    declarations: [
        AppComponent,
        DogsDetailsDialog,
        DogsComponent,
        DogsTableComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({dogs: reducer}),
        EffectsModule.forRoot([DogsEffects]),
        StoreDevtoolsModule.instrument(),
        HttpClientModule,
        SharedModule,
        NoopAnimationsModule,
        RouterModule.forRoot([
            {
                path: 'dogs',
                component: DogsComponent,
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'dogs',
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
