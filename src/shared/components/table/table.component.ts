import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core'
import { Column, ColumnSize, SearchParam, Sorting, SortingOrder } from './table'
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit {
    @Input() dataSource: any[] | null;
    @Input() columns: Column<T>[];
    @Input() sort: Sorting<T> | null;
    @Input() search: SearchParam<T> | null;

    @Output() sortChange = new EventEmitter<Sorting<T>>();
    @Output() searchChange = new EventEmitter<SearchParam<T>>();

    SortingOrder = SortingOrder;

    searchVisible = false;
    searchPopup: HTMLElement | null;

    gridStyle = '1fr 10fr 10fr';

    resizeWidth: number;
    resizePosition: number;
    resizingColumnIndex: number;

    private readonly MIN_COLUMN_SIZE = 220;

    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        if (this.searchPopup) {
            this.searchVisible = event.composedPath().includes(this.searchPopup);
        }
    }

    ngOnInit(): void {
        if (this.columns?.length) {
            this.updateColumnsStyles()
        }
    }

    onSort(key: keyof T) {
        if (this.sort?.sortingKey === key) {
            this.sortChange.emit({
                sortingKey: key,
                order: this.sort?.order === SortingOrder.ASC ? SortingOrder.DESC : SortingOrder.ASC,
            });
        } else {
            this.sortChange.emit({
                sortingKey: key,
                order: SortingOrder.ASC,
            });
        }
    }

    onSearch(event: Event, filterKey: keyof T) {
        this.searchChange.emit({
            value: (event.target as any).value,
            searchKey: filterKey,
        })
    }

    showSearch(event: Event) {
        // To prevent popup from closing after click on search icon
        event.stopPropagation();
        this.searchVisible = true
        setTimeout(() => {
            this.searchPopup = document.querySelector('.search-popup');
        })
    }

    drop(event: any) {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex)
        this.updateColumnsStyles()
    }

    onResize(event: DragEvent) {
        let currentSize = this.resizeWidth + (event.clientX - this.resizePosition);
        if (event.clientX <= 0 || this.totalColumnsWidth > window.outerWidth) {
            return;
        }
        if (currentSize >= this.MIN_COLUMN_SIZE && currentSize < window.outerWidth) {
            this.columns[this.resizingColumnIndex].size = `${ currentSize }px` as ColumnSize;
        } else {
            this.columns[this.resizingColumnIndex].size = `${ this.MIN_COLUMN_SIZE }px` as ColumnSize;
        }
        this.updateColumnsStyles();
    }

    onResizeStart(event: DragEvent, columnIndex: number) {
        event.stopPropagation();
        this.resizePosition = event.clientX;
        this.resizeWidth = ((event.target as HTMLElement).parentElement?.parentElement?.clientWidth || 0) - 1;
        this.resizingColumnIndex = columnIndex;
    }

    private updateColumnsStyles() {
        this.gridStyle = this.columns.map(column => column.size).join(' ')
    }

    private get totalColumnsWidth() {
        let totalWidth = 0;
        document.querySelectorAll('.grid-column').forEach(element => {
            totalWidth += (element as unknown as HTMLElement).clientWidth;
        })
        return totalWidth;
    }
}
