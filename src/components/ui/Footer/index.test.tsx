import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('Footer', () => {
  it('renders without errors and matches snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Footer />);

    expect(firstChild).toMatchSnapshot();
  });

  it('renders all 3 links elements', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3);
  });
});
