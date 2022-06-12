import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './index';

describe('Select', () => {
  const options = [
    { value: 'option 1', caption: 'option 1' },
    { value: 'option 2', caption: 'option 2' },
    { value: 'option 3', caption: 'option 3' },
  ];
  const defaultProps = {
    label: 'Select',
    options,
  };
  it('renders without errors and matches snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Select {...defaultProps} />);

    expect(firstChild).toMatchSnapshot();
  });

  it('should display label if label prop is passed and selecte the fist option by default', () => {
    render(<Select {...defaultProps} label="Select" />);
    screen.getByText('Select');
    expect(
      (screen.getByRole('option', { name: options[0].value }) as HTMLOptionElement).selected
    ).toBe(true);
  });

  it('should display the correct number of options', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getAllByRole('option').length).toBe(options.length);
  });

  it('should handle change events and simulate selection', async () => {
    const onChooseOptionMock = jest.fn();
    render(<Select {...defaultProps} onChange={onChooseOptionMock} />);

    const select = screen.getByLabelText(/select/i) as HTMLSelectElement;
    fireEvent.change(select);
    expect(onChooseOptionMock).toBeCalled();
    /*  userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: options[1].value })
    );
    expect((screen.getByRole('option', { name: options[1].value }) as HTMLOptionElement).selected).toBe(true); */
  });
});
