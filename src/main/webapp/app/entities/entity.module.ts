import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ElmoreplusPageModule } from './page/page.module';
import { ElmoreplusEntryModule } from './entry/entry.module';
import { ElmoreplusTagModule } from './tag/tag.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ElmoreplusPageModule,
        ElmoreplusEntryModule,
        ElmoreplusTagModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ElmoreplusEntityModule {}
