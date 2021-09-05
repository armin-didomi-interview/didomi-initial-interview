import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";

const didomiPopup = () => cy.get('#didomi-popup')
const headerSection = () => cy.get('.didomi-popup-notice-text > span > h1')
const consentTextSection = () => cy.get('.didomi-popup-notice-text-container > .didomi-popup-notice-text')
const privacyCenterButton = () => cy.get('a[href="https://privacy.didomi.io/"]')
const ourPartnersButton = () => cy.get('a[href="javascript:Didomi.preferences.show(\'vendors\')"]')
const closeConsentButton = () => cy.get('.didomi-popup-close')
const learnMoreButton = () => cy.get('#didomi-notice-learn-more-button')
const disagreeToConsentButton = () => cy.get('#didomi-notice-disagree-button')
const agreeToConsentButton = () => cy.get('#didomi-notice-agree-button')

Given('User is navigated to Didomi website', () => {
    cy.visit('https://www.didomi.io/')
})

And('Consent is shown properly', () => {
    didomiPopup().should('be.visible')
    headerSection().should('be.visible')
    consentTextSection().should('be.visible')
    privacyCenterButton().should('be.visible')
    ourPartnersButton().should('be.visible')
    closeConsentButton().should('be.visible')
    learnMoreButton().should('be.visible')
    disagreeToConsentButton().should('be.visible')
    agreeToConsentButton().should('be.visible')
})

When('User {string} consent by clicking on proper button', acceptsOrDeclines => {
    cy.intercept('POST', 'https://api.privacy-center.org/v1/events').as("PrivacyCenterEvents")
    getUserStatusFunctionality('empty')

    switch (acceptsOrDeclines) {
        case 'accepts':
            agreeToConsentButton().click()
            cy.wait('@PrivacyCenterEvents').then(  req => {
                expect(req.response.statusCode).equals(204)
                expect(req.request.body.type).equals('consent.given')
            })
            getUserStatusFunctionality('accepted')
            break
        case 'declines':
            disagreeToConsentButton().click()
            cy.wait('@PrivacyCenterEvents').then(  req => {
                expect(req.response.statusCode).equals(204)
                expect(req.request.body.type).equals('consent.given')
            })
            getUserStatusFunctionality('declined')
            break
    }
})

Then('Consent is closed out and user is navigated to the landing page', () => {
    didomiPopup().should('not.exist')
})

function getUserStatusFunctionality(status) {
        cy.window().then((win) => {
        const result = win.eval('Didomi.getUserStatus()');
        expect(result.addtl_consent).to.be.empty
        expect(result.consent_string).not.to.be.empty
        expect(result.created).not.to.be.empty
        expect(result.updated).not.to.be.empty
        expect(result.user_id).not.to.be.empty
        expect(result.purposes.legitimate_interest.disabled).length(0)
        expect(result.purposes.legitimate_interest.enabled).length(0)
        expect(result.vendors.legitimate_interest.disabled).length(0)
        expect(result.vendors.legitimate_interest.enabled).length(0)

        switch (status) {
            case 'empty':
                expect(result.purposes.consent.disabled).length(0)
                expect(result.purposes.consent.enabled).length(0)
                expect(result.vendors.consent.disabled).length(0)
                expect(result.vendors.consent.enabled).length(0)
                break
            case 'accepted':
                expect(result.purposes.consent.disabled).length(0)
                expect(result.purposes.consent.enabled).length(11)
                expect(result.vendors.consent.disabled).length(0)
                expect(result.vendors.consent.enabled).length(11)
                break
            case 'declined':
                expect(result.purposes.consent.disabled).length(11)
                expect(result.purposes.consent.enabled).length(0)
                expect(result.vendors.consent.disabled).length(11)
                expect(result.vendors.consent.enabled).length(0)
                break
        }
    });
}