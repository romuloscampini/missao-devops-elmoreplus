import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Page } from './page.model';
import { PagePopupService } from './page-popup.service';
import { PageService } from './page.service';

@Component({
    selector: 'jhi-page-delete-dialog',
    templateUrl: './page-delete-dialog.component.html'
})
export class PageDeleteDialogComponent {

    page: Page;

    constructor(
        private pageService: PageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pageListModification',
                content: 'Deleted an page'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-page-delete-popup',
    template: ''
})
export class PageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagePopupService: PagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pagePopupService
                .open(PageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
