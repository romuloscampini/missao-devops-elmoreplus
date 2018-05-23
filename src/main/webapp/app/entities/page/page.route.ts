import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PageComponent } from './page.component';
import { PageDetailComponent } from './page-detail.component';
import { PagePopupComponent } from './page-dialog.component';
import { PageDeletePopupComponent } from './page-delete-dialog.component';

export const pageRoute: Routes = [
    {
        path: 'page',
        component: PageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'page/:id',
        component: PageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagePopupRoute: Routes = [
    {
        path: 'page-new',
        component: PagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'page/:id/edit',
        component: PagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'page/:id/delete',
        component: PageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
