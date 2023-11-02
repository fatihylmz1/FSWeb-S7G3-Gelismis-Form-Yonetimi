//<reference types="cypress" />
import React from "react";


describe('S6G3 kontrol', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('vazgeç kontrol', () => {
        cy.get("#vazgeç-btn").click()

    })

    it('isim kontrol', () => {
        cy.get("#f_isim").type("fatih")
        cy.get("#f_isim").should("have.text", "fatih")
    })
    it("email kontrol", () => {
        cy.get("#f_email").type("fatih@gmail.com")

    })
    it("şifre kontrol", () => {
        cy.get("#f_sifre").type("123456789")

    })
    it("checkbox kontrol", () => {
        cy.get("#f_kvkk").click()

    })
    it("rol seçim kontrol", () => {
        cy.get("#rol-secim").click().select("DevOps")

    })

    it("kaydet kontrol", () => {
        cy.get("#f_isim").type("fatih")
        cy.get("#f_email").type("fatih@gmail.com")
        cy.get("#f_kvkk").click()
        cy.get("#f_sifre").type("123456789")
        cy.get("#gönder-btn").click()

    })
})