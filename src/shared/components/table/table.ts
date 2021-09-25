import { EventEmitter } from '@angular/core'

export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export interface Sorting<T> {
  order: SortingOrder;
  sortingKey: keyof T | null;
}

export enum ColumnSize {
  SM = '1fr',
  MD = '5fr',
  LG = '10fr',
}

export interface SearchParam<T> {
  value: string;
  searchKey: keyof T | null;
}

export interface Column<T> {
  title: string;
  size: ColumnSize;
  dataKey?: keyof T;
  searchable?: boolean;
  sortable?: boolean;
  provideCellEventEmitter?: EventEmitter<any>;
}
