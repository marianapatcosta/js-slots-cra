import { mount } from '@cypress/react';
import App from '@/App';

describe('App', () => {
  const baseUrl = (Cypress.config().baseUrl || '').replace(/\/$/, '');
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should visit app root url', () => {
    
  });
});
