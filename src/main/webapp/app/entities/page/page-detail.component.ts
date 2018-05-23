import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Page } from './page.model';
import { PageService } from './page.service';

@Component({
    selector: 'jhi-page-detail',
    templateUrl: './page-detail.component.html'
})
export class PageDetailComponent implements OnInit, OnDestroy {

    page: Page;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pageService: PageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPages();
    }

    load(id) {
        this.pageService.find(id)
            .subscribe((pageResponse: HttpResponse<Page>) => {
                this.page = pageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pageListModification',
            (response) => this.load(this.page.id)
        );
    }
}
