import '@cypress/react';
import { REELS_NUMBER } from '@/game-configs';

describe('Slot machine', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="reels"] [data-cy="reel"]').as('reel');
  });

  it('spins the symbols on the slots', () => {
    cy.get('@reel').should('have.length', REELS_NUMBER);
    cy.get('[data-cy="reels"] [data-cy="reel"]')
      .as('controllers')
      .find('button')
      .filter((i, button) => button.innerText.includes('SPIN'))
      .click();

    cy.get('[data-cy="reel"] [data-cy="symbol"]')
      .as('symbols')
      .then($el => {
        cy.get('[data-role="registered-tickets"] [data-role="ticket"]')
          /*   .should('have.length', 1) */
          .eq(0)
          .should('have.class', 'symbol-spinning');
      });
  });
});
