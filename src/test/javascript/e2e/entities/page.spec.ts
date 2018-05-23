import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Page e2e test', () => {

    let navBarPage: NavBarPage;
    let pageDialogPage: PageDialogPage;
    let pageComponentsPage: PageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Pages', () => {
        navBarPage.goToEntity('page');
        pageComponentsPage = new PageComponentsPage();
        expect(pageComponentsPage.getTitle())
            .toMatch(/Pages/);

    });

    it('should load create Page dialog', () => {
        pageComponentsPage.clickOnCreateButton();
        pageDialogPage = new PageDialogPage();
        expect(pageDialogPage.getModalTitle())
            .toMatch(/Create or edit a Page/);
        pageDialogPage.close();
    });

    it('should create and save Pages', () => {
        pageComponentsPage.clickOnCreateButton();
        pageDialogPage.setNameInput('name');
        expect(pageDialogPage.getNameInput()).toMatch('name');
        pageDialogPage.setHandleInput('handle');
        expect(pageDialogPage.getHandleInput()).toMatch('handle');
        pageDialogPage.userSelectLastOption();
        pageDialogPage.save();
        expect(pageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-page div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PageDialogPage {
    modalTitle = element(by.css('h4#myPageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    handleInput = element(by.css('input#field_handle'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setHandleInput = function(handle) {
        this.handleInput.sendKeys(handle);
    };

    getHandleInput = function() {
        return this.handleInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
