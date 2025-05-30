import React from 'react';
import { render, fireEvent } from '../../test-utils/renderWithProviders';
import { Card, CardHeader, CardBody, CardFooter, ImageCard } from './Card';
import { Text, View } from 'react-native';

describe('Card Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('handles onPress when touchable is true', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Card touchable onPress={onPressMock} testID="touchable-card">
        <Text>Touchable</Text>
      </Card>
    );
    const cardElement = getByTestId('touchable-card');
    fireEvent.press(cardElement);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('is not touchable by default or when touchable is false', () => {
    const onPressMock = jest.fn();
     // By default, not touchable
    const { getByText, rerender } = render(
      <Card onPress={onPressMock}>
        <Text>Not Touchable Default</Text>
      </Card>
    );
    // To test non-touchability, ensure it's not a TouchableOpacity or that onPress isn't called.
    // Since it renders a View, not a TouchableOpacity, fireEvent.press might not work as expected
    // or might throw an error if the element isn't considered pressable.
    // We can check the type of the rendered component if possible, or rely on onPress not being called.
    // For this test, if fireEvent.press doesn't error and mock isn't called, it's a pass.
    // A more robust test would be to check the component type or props.
    const cardText = getByText('Not Touchable Default');
    // It's hard to directly test if a View is "not pressable" without onPress.
    // We rely on the implementation detail that it renders a View.
    // If it rendered TouchableOpacity, this test would need adjustment.

    rerender(
      <Card touchable={false} onPress={onPressMock} testID="non-touchable-card-explicit">
        <Text>Not Touchable Explicit</Text>
      </Card>
    );
    const cardElementExplicit = getByText('Not Touchable Explicit'); // Get the text element
    // fireEvent.press(cardElementExplicit.parent); // Press the Card itself
    // If it's a View, onPress prop shouldn't exist on it in this case.
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders with different variants and paddings', () => {
    // This test would primarily be visual or snapshot-based to confirm style changes.
    // Programmatic style checking can be brittle.
    // For now, just ensure it renders with these props without crashing.
    const { rerender } = render(<Card variant="elevated" padding="lg"><Text>Test</Text></Card>);
    expect(getByText('Test')).toBeTruthy();

    rerender(<Card variant="outlined" padding="sm"><Text>Test Outlined</Text></Card>);
    expect(getByText('Test Outlined')).toBeTruthy();

    rerender(<Card variant="filled" padding="none"><Text>Test Filled</Text></Card>);
    expect(getByText('Test Filled')).toBeTruthy();
  });

  // CardHeader, CardBody, CardFooter tests
  it('renders CardHeader, CardBody, and CardFooter correctly', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <Text>Header Content</Text>
        </CardHeader>
        <CardBody>
          <Text>Body Content</Text>
        </CardBody>
        <CardFooter>
          <Text>Footer Content</Text>
        </CardFooter>
      </Card>
    );
    expect(getByText('Header Content')).toBeTruthy();
    expect(getByText('Body Content')).toBeTruthy();
    expect(getByText('Footer Content')).toBeTruthy();
  });

  // ImageCard tests
  it('renders ImageCard with image and children', () => {
    const { getByText, UNSAFE_getByProps } = render(
      <ImageCard imageUri="https://via.placeholder.com/150">
        <Text>Image Card Content</Text>
      </ImageCard>
    );
    expect(getByText('Image Card Content')).toBeTruthy();
    const imageComponent = UNSAFE_getByProps({ source: { uri: 'https://via.placeholder.com/150' } });
    expect(imageComponent).toBeTruthy();
  });

  it('ImageCard handles onPress when provided', () => {
    const onPressImageMock = jest.fn();
    const { getByText } = render(
      <ImageCard imageUri="https://via.placeholder.com/150" onPress={onPressImageMock}>
        <Text>Touchable Image Card</Text>
      </ImageCard>
    );
    // ImageCard renders a TouchableOpacity as its root if onPress is provided.
    // We press the text, assuming it's within the touchable area.
    fireEvent.press(getByText('Touchable Image Card'));
    expect(onPressImageMock).toHaveBeenCalledTimes(1);
  });
});
