describe('My First Test', () => {
    it('should do things', () => {
        cy.visit('/');
        cy.contains('I am a very long url - click me');
    });
});
