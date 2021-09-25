import { DogsState } from './dogs.reducer';
import { compareItems } from '../../../../shared/utils/utils';
import { SortingOrder } from '../../../../shared/components/table/table';
import { Dog } from '../dogs';

export const selectDogs = ({ dogs: state }: { dogs: DogsState }) => {
    let newItems = [...state.dogs];
    if (state.search.searchKey) {
        newItems = newItems.filter(item => String((item[(state.search.searchKey as keyof Dog)])).includes(state.search?.value))
    }
    if (state.sort?.sortingKey) {
        newItems.sort((a: any, b: any) => {
            if (state.sort?.order === SortingOrder.ASC) {
                return compareItems(a[(state.sort?.sortingKey as keyof Dog)], b[(state.sort?.sortingKey as keyof Dog)])
            }
            return compareItems(b[(state.sort?.sortingKey as keyof Dog)], a[(state.sort?.sortingKey as keyof Dog)])
        })
    }
    return newItems;
};
