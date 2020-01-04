import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

// without the injectable phrase, the code does not build
@Injectable()
export class PaginatorIntlFa extends MatPaginatorIntl {
    nextPageLabel = 'Next Page';
    previousPageLabel = 'Previous Page';
    firstPageLabel = 'صفحه اول';
    lastPageLabel = 'صفحه آخر';
    itemsPerPageLabel = 'item per page';
    getRangeLabel = (page: number, pageSize: number, length: number) => {
        const from = page * pageSize + 1;
        const to = Math.min((page + 1) * pageSize, length);
        // return `${from} - ${to} از ${length}`;
        return `${from} - ${to}`;
    }
}
