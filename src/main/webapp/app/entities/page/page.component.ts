import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Page } from './page.model';
import { PageService } from './page.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-page',
    templateUrl: './page.component.html'
})
export class PageComponent implements OnInit, OnDestroy {
pages: Page[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pageService: PageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pageService.query().subscribe(
            (res: HttpResponse<Page[]>) => {
                this.pages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Page) {
        return item.id;
    }
    registerChangeInPages() {
        this.eventSubscriber = this.eventManager.subscribe('pageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
