import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button', () => {
  const onClickMock = jest.fn();
  const defaultProps = {
    label: 'Button',
    onClick: onClickMock,
  };
  it('renders without errors and matches snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Button {...defaultProps} />);

    expect(firstChild).toMatchSnapshot();
  });

  it('should display label', () => {
    render(<Button {...defaultProps} />);
    screen.getByText('Button');
  });

  it('should handle click events', () => {
    const onClickMock = jest.fn();
    const {
      container: { firstChild },
    } = render(<Button {...defaultProps} onClick={onClickMock} />);

    firstChild && fireEvent.click(firstChild);

    expect(onClickMock).toBeCalled();
  });

  describe('Disabled Button', () => {
    test('should display text', () => {
      render(<Button {...defaultProps} disabled={true} />);
      screen.getByText('Button');
    });

    it('should be disabled', () => {
      const {
        container: { firstChild },
      } = render(<Button {...defaultProps} disabled={true} />);

      expect(firstChild).toHaveAttribute('disabled');
    });

    it('should not handle click events', () => {
      const {
        container: { firstChild },
      } = render(<Button {...defaultProps} disabled />);

      firstChild && fireEvent.click(firstChild);

      expect(onClickMock).not.toBeCalled();
    });
  });

  it('should play sound on click', () => {
    const sound = new Audio() as HTMLAudioElement;
    const playMock = jest.fn();
    Object.defineProperty(global.window.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      get() {
        return playMock;
      },
    });
    const {
      container: { firstChild },
    } = render(<Button {...defaultProps} buttonSound={sound} />);

    firstChild && fireEvent.click(firstChild);

    expect(playMock).toBeCalled();
  });
});
