import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Page } from './page.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Page>;

@Injectable()
export class PageService {

    private resourceUrl =  SERVER_API_URL + 'api/pages';

    constructor(private http: HttpClient) { }

    create(page: Page): Observable<EntityResponseType> {
        const copy = this.convert(page);
        return this.http.post<Page>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(page: Page): Observable<EntityResponseType> {
        const copy = this.convert(page);
        return this.http.put<Page>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Page>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Page[]>> {
        const options = createRequestOption(req);
        return this.http.get<Page[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Page[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Page = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Page[]>): HttpResponse<Page[]> {
        const jsonResponse: Page[] = res.body;
        const body: Page[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Page.
     */
    private convertItemFromServer(page: Page): Page {
        const copy: Page = Object.assign({}, page);
        return copy;
    }

    /**
     * Convert a Page to a JSON which can be sent to the server.
     */
    private convert(page: Page): Page {
        const copy: Page = Object.assign({}, page);
        return copy;
    }
}
