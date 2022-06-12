import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './index';
import { Provider } from 'react-redux';
import { store } from '@/store';

describe('Header', () => {
  it('renders without errors and matches snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(firstChild).toMatchSnapshot();
  });

  it('executes `share` function on share button click', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const mockShare = jest.fn().mockImplementation(() => Promise.resolve());
    Object.defineProperty(window, 'navigator', {
      value: {
        share: mockShare,
      },
    });
    const shareButton = screen.getByRole('button') as HTMLButtonElement;
    shareButton && fireEvent.click(shareButton);
    expect(shareButton).toBeTruthy();
    expect(mockShare).toHaveBeenCalled();
  });
});
