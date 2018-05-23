import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Entry } from './entry.model';
import { EntryPopupService } from './entry-popup.service';
import { EntryService } from './entry.service';
import { Page, PageService } from '../page';
import { Tag, TagService } from '../tag';

@Component({
    selector: 'jhi-entry-dialog',
    templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {

    entry: Entry;
    isSaving: boolean;

    pages: Page[];

    tags: Tag[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private entryService: EntryService,
        private pageService: PageService,
        private tagService: TagService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pageService.query()
            .subscribe((res: HttpResponse<Page[]>) => { this.pages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tagService.query()
            .subscribe((res: HttpResponse<Tag[]>) => { this.tags = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.entry.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entryService.update(this.entry));
        } else {
            this.subscribeToSaveResponse(
                this.entryService.create(this.entry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Entry>>) {
        result.subscribe((res: HttpResponse<Entry>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Entry) {
        this.eventManager.broadcast({ name: 'entryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPageById(index: number, item: Page) {
        return item.id;
    }

    trackTagById(index: number, item: Tag) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-entry-popup',
    template: ''
})
export class EntryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entryPopupService: EntryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entryPopupService
                    .open(EntryDialogComponent as Component, params['id']);
            } else {
                this.entryPopupService
                    .open(EntryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
