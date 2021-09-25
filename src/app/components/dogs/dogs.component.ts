import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Column, ColumnSize, SearchParam, Sorting } from '../../../shared/components/table/table';
import { getAllDogs, getDogPicture, searchDog, sortDogs } from './store/dogs.actions';
import { select, Store } from '@ngrx/store';
import { DogsState } from './store/dogs.reducer';
import { Dog } from './dogs';
import { selectDogs } from './store/dogs.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-dogs',
    templateUrl: './dogs.component.html',
    styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit, OnDestroy {

    getDogPictureEventEmitter = new EventEmitter<Dog>();

    columns: Column<Dog>[] = [
        {
            title: 'Id',
            size: ColumnSize.SM,
            dataKey: 'id',
            sortable: true,
        },
        {
            title: 'Breed Name',
            size: ColumnSize.LG,
            dataKey: 'breed',
            sortable: true,
            searchable: true,
        },
        {
            title: 'Random Breed Picture',
            size: ColumnSize.LG,
            provideCellEventEmitter: this.getDogPictureEventEmitter,
        },
    ];

    dogs$ = this.store.pipe(select(selectDogs));
    sort$ = this.store.pipe(select('dogs', 'sort'));
    search$ = this.store.pipe(select('dogs', 'search'));

    private destroy$ = new Subject();

    constructor(private store: Store<{ dogs: DogsState }>) {
    }

    ngOnInit(): void {
        this.store.dispatch(getAllDogs());
        this.getDogPictureEventEmitter
            .pipe(takeUntil(this.destroy$))
            .subscribe(dog => this.store.dispatch(getDogPicture(dog)))
    }

    onSortChange(sort: Sorting<Dog>) {
        this.store.dispatch(sortDogs({sort}))
    }

    onSearchChange(search: SearchParam<Dog>) {
        this.store.dispatch(searchDog({search}))
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
