import { ReactSvg } from '@/assets/svg';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonIcon } from './index';

describe('ButtonIcon', () => {
  const sound = new Audio() as HTMLAudioElement;
  const onClickMock = jest.fn();
  const defaultProps = {
    icon: ReactSvg,
    buttonSound: sound,
    onClick: onClickMock,
  };
  it('renders without errors and matches snapshot', () => {
    const {
      container: { firstChild },
    } = render(<ButtonIcon {...defaultProps} />);

    expect(firstChild).toMatchSnapshot();
  });

  it('should display icon', () => {
    render(<ButtonIcon {...defaultProps} />);
    const icon = screen.getByTestId('button-icon');
    expect(icon).toBeTruthy();
  });

  it('should handle click events', () => {
    const {
      container: { firstChild },
    } = render(<ButtonIcon {...defaultProps} />);

    firstChild && fireEvent.click(firstChild);

    expect(onClickMock).toBeCalled();
  });

  it('should play sound on click', () => {
    const playMock = jest.fn();
    Object.defineProperty(global.window.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      get() {
        return playMock;
      },
    });
    const {
      container: { firstChild },
    } = render(<ButtonIcon {...defaultProps} />);

    firstChild && fireEvent.click(firstChild);

    expect(playMock).toBeCalled();
  });
});
