import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './index';

describe('Checkbox', () => {
  const defaultProps = {
    label: 'Checkbox label',
    checked: false,
    onChange: () => null,
  };
  it('renders without errors and matches snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Checkbox {...defaultProps} />);

    expect(firstChild).toMatchSnapshot();
  });

  it('should display label', () => {
    render(<Checkbox {...defaultProps} />);

    screen.getByText('Checkbox label');
  });

  it('should handle change events', () => {
    const onChangeMock = jest.fn();
    render(<Checkbox {...defaultProps} onChange={onChangeMock} />);
    const checkbox = screen.getByLabelText(/Checkbox Label/i) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(onChangeMock).toBeCalled();
  });
});
