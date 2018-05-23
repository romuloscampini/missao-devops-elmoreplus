import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElmoreplusSharedModule } from '../../shared';
import { ElmoreplusAdminModule } from '../../admin/admin.module';
import {
    PageService,
    PagePopupService,
    PageComponent,
    PageDetailComponent,
    PageDialogComponent,
    PagePopupComponent,
    PageDeletePopupComponent,
    PageDeleteDialogComponent,
    pageRoute,
    pagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...pageRoute,
    ...pagePopupRoute,
];

@NgModule({
    imports: [
        ElmoreplusSharedModule,
        ElmoreplusAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PageComponent,
        PageDetailComponent,
        PageDialogComponent,
        PageDeleteDialogComponent,
        PagePopupComponent,
        PageDeletePopupComponent,
    ],
    entryComponents: [
        PageComponent,
        PageDialogComponent,
        PagePopupComponent,
        PageDeleteDialogComponent,
        PageDeletePopupComponent,
    ],
    providers: [
        PageService,
        PagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ElmoreplusPageModule {}
