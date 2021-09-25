import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getAllDogs, getAllDogsSuccess, getDogPicture, getDogPictureSuccess } from './dogs.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DogsService } from '../dogs.service';
import { EMPTY } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DogsDetailsDialog } from '../dogs-details/dogs-details-dialog.component';
import { Dog } from '../dogs';

@Injectable()
export class DogsEffects {

    getAllDogs$ = createEffect(() => this.actions$.pipe(
        ofType(getAllDogs.type),
        switchMap(() => this.dogsService.getAllDogs()
            .pipe(
                map(dogs => getAllDogsSuccess({ dogs })),
                catchError(() => EMPTY)
            ))
        )
    );

    getDogPicture$ = createEffect(() => this.actions$.pipe(
        ofType(getDogPicture.type),
        switchMap((dog: Dog) => this.dogsService.getDogPicture(dog)
            .pipe(
                map(dog => getDogPictureSuccess({ dog })),
                catchError(() => EMPTY)
            ))
        )
    )

    openDogDetailsDialog$  = createEffect(() => this.actions$.pipe(
        ofType(getDogPictureSuccess),
        tap(({ dog: data }) => {
            this.dialog.open(DogsDetailsDialog, { data })
        })
    ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private dogsService: DogsService,
        private dialog: MatDialog,
    ) {}
}
