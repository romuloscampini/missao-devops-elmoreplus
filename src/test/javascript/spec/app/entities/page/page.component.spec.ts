/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ElmoreplusTestModule } from '../../../test.module';
import { PageComponent } from '../../../../../../main/webapp/app/entities/page/page.component';
import { PageService } from '../../../../../../main/webapp/app/entities/page/page.service';
import { Page } from '../../../../../../main/webapp/app/entities/page/page.model';

describe('Component Tests', () => {

    describe('Page Management Component', () => {
        let comp: PageComponent;
        let fixture: ComponentFixture<PageComponent>;
        let service: PageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ElmoreplusTestModule],
                declarations: [PageComponent],
                providers: [
                    PageService
                ]
            })
            .overrideTemplate(PageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Page(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
