import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TableComponent } from '../../../shared/components/table/table.component';
import { Dog } from './dogs';

@Component({
    selector: 'app-dogs-table',
    templateUrl: '../../../shared/components/table/table.component.html',
    styleUrls: ['../../../shared/components/table/table.component.scss'],
})
export class DogsTableComponent extends TableComponent<Dog> {
}
