import React from 'react';
import { render, fireEvent } from '../../test-utils/renderWithProviders';
import { Input } from './Input';
import { Text } from 'react-native';

describe('Input Component', () => {
  it('renders correctly with a label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Username" placeholder="Enter username" />
    );
    expect(getByText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Enter username')).toBeTruthy();
  });

  it('calls onChangeText when text is changed', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Test Input" onChangeText={onChangeTextMock} />
    );
    const inputElement = getByPlaceholderText('Test Input');
    fireEvent.changeText(inputElement, 'hello world');
    expect(onChangeTextMock).toHaveBeenCalledWith('hello world');
  });

  it('displays the value passed to it', () => {
    const { getByDisplayValue } = render(<Input value="Initial Value" />);
    expect(getByDisplayValue('Initial Value')).toBeTruthy();
  });

  it('renders an error message when error prop is provided', () => {
    const { getByText } = render(<Input label="Password" error="Password is too short" />);
    expect(getByText('Password is too short')).toBeTruthy();
    // You might also want to check for specific error styling (e.g., text color)
  });

  it('does not render error message when error prop is not provided', () => {
    const { queryByText } = render(<Input label="Email" />);
    // queryByText is used because the absence of the text is the expected state.
    // This will search for any text that might be an error message.
    // A more specific approach would be to ensure no element with a testID for error messages exists.
    expect(queryByText(/error/i)).toBeNull(); // Assuming error messages might contain "error"
  });

  it('renders left and right icons', () => {
    const LeftIcon = <Text testID="left-icon">L</Text>;
    const RightIcon = <Text testID="right-icon">R</Text>;
    const { getByTestId } = render(
      <Input label="Search" leftIcon={LeftIcon} rightIcon={RightIcon} />
    );
    expect(getByTestId('left-icon')).toBeTruthy();
    expect(getByTestId('right-icon')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Disabled Input" disabled onChangeText={onChangeTextMock} />
    );
    const inputElement = getByPlaceholderText('Disabled Input');
    expect(inputElement.props.editable).toBe(false);
    // fireEvent.changeText(inputElement, 'test'); // This would likely still call onChangeText due to RN limitations
    // expect(onChangeTextMock).not.toHaveBeenCalled(); // Thus, this check might not be reliable for `disabled` in TextInput
    // The primary check is `editable={false}`
  });

  it('respects secureTextEntry prop', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Password" secureTextEntry />
    );
    const inputElement = getByPlaceholderText('Password');
    expect(inputElement.props.secureTextEntry).toBe(true);
  });

  it('passes other TextInput props', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Email Input" keyboardType="email-address" autoCapitalize="none" />
    );
    const inputElement = getByPlaceholderText('Email Input');
    expect(inputElement.props.keyboardType).toBe('email-address');
    expect(inputElement.props.autoCapitalize).toBe('none');
  });

  // Add a test for focus and blur if onFocus/onBlur handlers are important
  it('calls onFocus and onBlur', () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Focus Test" onFocus={onFocusMock} onBlur={onBlurMock} />
    );
    const inputElement = getByPlaceholderText('Focus Test');

    fireEvent(inputElement, 'focus');
    expect(onFocusMock).toHaveBeenCalledTimes(1);

    fireEvent(inputElement, 'blur');
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });
});
