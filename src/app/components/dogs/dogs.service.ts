import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Dog, DogListResponse, DogPictureResponse } from './dogs';

@Injectable({
    providedIn: 'root',
})
export class DogsService {

    getAllDogs() {
        return this.http.get<DogListResponse>('https://dog.ceo/api/breeds/list/all').pipe(
            map(({message}) => Object.keys(message).map((breed: string, i: number) => ({id: i + 1, breed})))
        )
    }

    getDogPicture(dog: Dog) {
        return this.http.get<DogPictureResponse>(`https://dog.ceo/api/breed/${ dog.breed }/images/random`).pipe(
            map(({message: pictureLink}) => ({...dog, pictureLink}))
        )
    }

    constructor(
        private http: HttpClient,
    ) {
    }
}
