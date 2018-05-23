import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Page } from './page.model';
import { PagePopupService } from './page-popup.service';
import { PageService } from './page.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-page-dialog',
    templateUrl: './page-dialog.component.html'
})
export class PageDialogComponent implements OnInit {

    page: Page;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pageService: PageService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.page.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pageService.update(this.page));
        } else {
            this.subscribeToSaveResponse(
                this.pageService.create(this.page));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Page>>) {
        result.subscribe((res: HttpResponse<Page>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Page) {
        this.eventManager.broadcast({ name: 'pageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-page-popup',
    template: ''
})
export class PagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagePopupService: PagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pagePopupService
                    .open(PageDialogComponent as Component, params['id']);
            } else {
                this.pagePopupService
                    .open(PageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
