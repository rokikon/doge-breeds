import { createAction, props } from '@ngrx/store';
import { dogsFeatureKey } from './dogs.consts';
import { SearchParam, Sorting } from '../../../../shared/components/table/table';
import { Dog } from '../dogs';

export const getAllDogs = createAction(`[${ dogsFeatureKey }] Get All Dogs`);
export const getAllDogsSuccess = createAction(
  `[${ dogsFeatureKey }] Get All Dogs Success`,
  props<{ dogs: Dog[] }>(),
);
export const getAllDogsError = createAction(`[${ dogsFeatureKey }] Get All Dogs Error`);

export const getDogPicture = createAction(
  `[${ dogsFeatureKey }] Get Dog Picture`,
  props<Dog>(),
);
export const getDogPictureSuccess = createAction(
  `[${ dogsFeatureKey }] Get Dog Picture Success`,
  props<{ dog: Dog }>(),
);
export const getDogPictureError = createAction(`[${ dogsFeatureKey }] Get Dog Picture Error`);

export const sortDogs = createAction(
  `[${ dogsFeatureKey }] Sort Dogs`,
  props<{ sort: Sorting<Dog> }>()
);

export const searchDog = createAction(
  `[${ dogsFeatureKey }] Search Dogs`,
  props<{ search: SearchParam<Dog> }>()
);
