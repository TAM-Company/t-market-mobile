import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '../../test-utils/renderWithProviders'; // Use custom render
import { Button } from './Button';
import { lightTheme } from '../../context/ThemeContext'; // To access theme properties for assertions

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press Me" onPress={onPressMock} />);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Disabled" onPress={onPressMock} disabled />);
    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies disabled styles when disabled', () => {
    const { getByText } = render(<Button title="Disabled" onPress={() => {}} disabled />);
    const buttonText = getByText('Disabled');
    // Check for opacity style as defined in Button.tsx for disabled state
    // Note: Accessing parent styles can be tricky. This checks the text element itself.
    // A more robust way might involve snapshots or checking a style prop if passed down.
    // For this example, we assume the opacity change on the TouchableOpacity affects children or is testable this way.
    // Or, you could check if the TouchableOpacity itself has reduced opacity.
    // The `styles.disabled` in Button.tsx has `opacity: 0.5`.
    // The `TouchableOpacity` is the root element rendered by Button.
    const touchableOpacity = buttonText.parent?.parent; // Adjust based on actual rendered hierarchy
    // This is a simplified check. Actual style checking can be complex.
    // It's often better to test the *effect* of being disabled (e.g., not clickable)
    // rather than specific style properties, unless visual regression testing is set up.
    expect(touchableOpacity?.props.style).toEqual(expect.arrayContaining([
      expect.objectContaining({ opacity: 0.5 }) // From theme.disabled
    ]));
  });

  it('renders with different variants', () => {
    const { getByText: getByTextPrimary } = render(
      <Button title="Primary" onPress={() => {}} variant="primary" />
    );
    expect(getByTextPrimary('Primary')).toBeTruthy();
    // Add style checks if necessary, e.g., background color
    // const primaryButton = getByTextPrimary('Primary').parent.parent;
    // expect(primaryButton.props.style).toEqual(expect.arrayContaining([
    //   expect.objectContaining({ backgroundColor: lightTheme.colors.primary[500] })
    // ]));


    const { getByText: getByTextSecondary } = render(
      <Button title="Secondary" onPress={() => {}} variant="secondary" />
    );
    expect(getByTextSecondary('Secondary')).toBeTruthy();
    // const secondaryButton = getByTextSecondary('Secondary').parent.parent;
    // expect(secondaryButton.props.style).toEqual(expect.arrayContaining([
    //   expect.objectContaining({ backgroundColor: lightTheme.colors.secondary[100] })
    // ]));

    const { getByText: getByTextOutline } = render(
      <Button title="Outline" onPress={() => {}} variant="outline" />
    );
    expect(getByTextOutline('Outline')).toBeTruthy();

    const { getByText: getByTextGhost } = render(
      <Button title="Ghost" onPress={() => {}} variant="ghost" />
    );
    expect(getByTextGhost('Ghost')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByText: getByTextSm } = render(<Button title="Small" onPress={() => {}} size="sm" />);
    expect(getByTextSm('Small')).toBeTruthy();
    // Check height or padding if necessary from theme.dimensions.button.sm

    const { getByText: getByTextLg } = render(<Button title="Large" onPress={() => {}} size="lg" />);
    expect(getByTextLg('Large')).toBeTruthy();
  });

  it('renders with left and right icons', () => {
    const LeftIcon = <Text>L</Text>;
    const RightIcon = <Text>R</Text>;
    const { getByText } = render(
      <Button title="Icon Button" onPress={() => {}} leftIcon={LeftIcon} rightIcon={RightIcon} />
    );
    expect(getByText('L')).toBeTruthy();
    expect(getByText('R')).toBeTruthy();
    expect(getByText('Icon Button')).toBeTruthy();
  });

  it('shows ActivityIndicator when loading', () => {
    const { getByTestId, queryByText } = render(
      <Button title="Loading Button" onPress={() => {}} loading />
    );
    // @testing-library/react-native doesn't directly support getByTestId for ActivityIndicator's default testID.
    // We need to ensure ActivityIndicator is rendered.
    // A common way is to check that the title is NOT rendered, and an indicator is.
    // Or, if Button internals change to set a testID on ActivityIndicator, use that.
    expect(queryByText('Loading Button')).toBeNull(); // Title should be hidden
    // This requires Button to pass a testID to ActivityIndicator, e.g., testID="loading-indicator"
    // const activityIndicator = getByTestId('loading-indicator');
    // expect(activityIndicator).toBeTruthy();
    // For now, we'll rely on the title being absent as an indicator.
    // A more direct test would be to check for the ActivityIndicator component itself,
    // which can be done with react-test-renderer or by querying props.
  });

   it('applies fullWidth style when fullWidth is true', () => {
    const { getByText } = render(<Button title="Full Width" onPress={() => {}} fullWidth />);
    const buttonText = getByText('Full Width');
    const touchableOpacity = buttonText.parent?.parent;
     expect(touchableOpacity?.props.style).toEqual(expect.arrayContaining([
      expect.objectContaining({ width: "100%" })
    ]));
  });
});
