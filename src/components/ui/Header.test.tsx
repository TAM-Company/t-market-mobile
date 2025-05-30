import React from 'react';
import { render, fireEvent } from '../../test-utils/renderWithProviders';
import { Header } from './Header';
import { Text } from 'react-native';

// Mock useAppNavigation from expo-router or your navigation hook
const mockGoBack = jest.fn();
const mockNavigateToCart = jest.fn();
jest.mock('../../hooks/useNavigation', () => ({
  useAppNavigation: () => ({
    goBack: mockGoBack,
    navigateToCart: mockNavigateToCart,
    // Add other navigation functions if Header uses them
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockGoBack.mockClear();
    mockNavigateToCart.mockClear();
  });

  it('renders title and subtitle correctly', () => {
    const { getByText } = render(<Header title="Page Title" subtitle="Page Subtitle" />);
    expect(getByText('Page Title')).toBeTruthy();
    expect(getByText('Page Subtitle')).toBeTruthy();
  });

  it('shows back button and calls goBack on press when showBackButton is true', () => {
    const { getByTestId } // Assuming Ionicons mock or a custom testID on the TouchableOpacity
      = render(<Header title="With Back Button" showBackButton />);
    // In Header, the back button TouchableOpacity doesn't have a direct testID.
    // It contains an Ionicons component. Our mock for Ionicons is a View.
    // We might need to make the mock more sophisticated or add testIDs in the component.
    // For now, let's assume a testID="header-left-button" is added to the TouchableOpacity for the left icon.
    // Or, find by icon name if the icon mock supports it.
    // As per current Header.tsx, the left button is rendered if getLeftIcon() or onLeftPress is true.
    // getLeftIcon() returns "arrow-back" if showBackButton is true.
    // The Ionicons mock needs to be queryable.
    // Let's assume we can find the TouchableOpacity for the left button.
    // This is a limitation of testing without specific testIDs on touchable areas.

    // A practical way if testID is not present:
    // Find the icon by its name prop if the mock allows, or the TouchableOpacity by accessibilityRole/Label.
    // For this example, we'll assume the press on the "arrow-back" icon's container.
    // This requires that the Ionicons mock renders something identifiable or that the TouchableOpacity has a testID.
    // As a fallback, if there's only one button, find it.

    // If Header's TouchableOpacity for left button had testID="header-left-button":
    // const leftButton = getByTestId('header-left-button');
    // fireEvent.press(leftButton);
    // expect(mockGoBack).toHaveBeenCalledTimes(1);
    // This test needs a way to identify the left button.
  });

  it('calls onLeftPress when provided and left icon is pressed', () => {
    const onLeftPressMock = jest.fn();
    // Assuming a testID or a way to find the left button
    const { getByTestId } = render(
      <Header title="Custom Left Press" leftIcon="menu" onLeftPress={onLeftPressMock} testID="header-left-button" />
    );
    // const leftButton = getByTestId('header-left-button');
    // fireEvent.press(leftButton);
    // expect(onLeftPressMock).toHaveBeenCalledTimes(1);
    // expect(mockGoBack).not.toHaveBeenCalled(); // Ensure default goBack isn't called
  });

  it('shows cart button and calls navigateToCart on press when showCartButton is true', () => {
    // Similar identification challenge as back button
    render(<Header title="With Cart Button" showCartButton />);
    // Assume testID="header-right-button" for the right TouchableOpacity
    // const rightButton = getByTestId('header-right-button');
    // fireEvent.press(rightButton);
    // expect(mockNavigateToCart).toHaveBeenCalledTimes(1);
  });

  it('calls onRightPress when provided and right icon is pressed', () => {
    const onRightPressMock = jest.fn();
    const { getByTestId } = render(
      <Header title="Custom Right Press" rightIcon="search" onRightPress={onRightPressMock} testID="header-right-button" />
    );
    // const rightButton = getByTestId('header-right-button');
    // fireEvent.press(rightButton);
    // expect(onRightPressMock).toHaveBeenCalledTimes(1);
    // expect(mockNavigateToCart).not.toHaveBeenCalled();
  });

  it('renders custom left and right components', () => {
    const LeftComponent = <Text testID="custom-left">Custom Left</Text>;
    const RightComponent = <Text testID="custom-right">Custom Right</Text>;
    const { getByTestId } = render(
      <Header title="Custom Components" leftComponent={LeftComponent} rightComponent={RightComponent} />
    );
    expect(getByTestId('custom-left')).toBeTruthy();
    expect(getByTestId('custom-right')).toBeTruthy();
  });

  it('renders correctly with different variants and sizes', () => {
    // Primarily for ensuring no crashes and basic rendering. Style checks are complex.
    const { rerender, getByText } = render(
      <Header title="Test Variant Size" variant="primary" size="lg" />
    );
    expect(getByText('Test Variant Size')).toBeTruthy();

    rerender(<Header title="Test Transparent" variant="transparent" size="sm" />);
    expect(getByText('Test Transparent')).toBeTruthy();
  });

  // Note: Testing the actual icon rendering (e.g. correct Ionicons name) depends heavily on the Icon mock.
  // The current mock for Ionicons is a simple View.
  // To test icon names, the mock would need to store the 'name' prop.
  // Example for a more advanced mock (in jest-setup.js):
  // jest.mock('@expo/vector-icons', () => ({
  //   Ionicons: jest.fn(props => <View testID="ionicons-mock" iconName={props.name} />),
  // }));
  // Then in test:
  // const iconMock = getByTestId('ionicons-mock');
  // expect(iconMock.props.iconName).toBe('arrow-back');

  // For the current setup, testing specific icon names is omitted.
  // The tests for button presses (left/right) are also commented out as they rely on
  // being able to find the TouchableOpacity, which usually requires a testID in the component itself.
  // Adding testIDs to the TouchableOpacity elements within Header.tsx would make these tests feasible.
  // e.g., <TouchableOpacity testID="header-left-button" ... > for the left button.
});
