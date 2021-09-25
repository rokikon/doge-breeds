import { Dog } from '../dogs';
import { SearchParam, Sorting, SortingOrder } from '../../../../shared/components/table/table';
import { Action, createReducer, on } from '@ngrx/store';
import { getAllDogsSuccess, getDogPictureSuccess, searchDog, sortDogs } from './dogs.actions';

export interface DogsState {
    dogs: Dog[];
    selectedDog: Dog | null;
    sort: Sorting<Dog>;
    search: SearchParam<Dog>;
}

export const initialDogsState: DogsState = {
    dogs: [],
    selectedDog: null,
    sort: { sortingKey: null, order: SortingOrder.ASC },
    search: { searchKey: null, value: '' }
}

const dogsReducer = createReducer(
    initialDogsState,
    on(getAllDogsSuccess, (state, { dogs }) => ({ ...state, dogs })),
    on(getDogPictureSuccess, (state,  { dog: selectedDog }) => ({ ...state, selectedDog })),
    on(sortDogs, (state, { sort }) => ({ ...state, sort })),
    on(searchDog, (state, { search }) => ({ ...state, search })),
)

export function reducer(state: DogsState | undefined, action: Action) {
    return dogsReducer(state, action)
}
