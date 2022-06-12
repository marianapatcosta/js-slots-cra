import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render without errors and match snapshot', () => {
    const {
      container: { firstChild },
    } = render(<App />);

    expect(firstChild).toMatchSnapshot();
  });
});
