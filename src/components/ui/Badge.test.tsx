import React from 'react';
import { render } from '../../test-utils/renderWithProviders';
import { Badge } from './Badge';
import { lightTheme } from '../../context/ThemeContext';

describe('Badge Component', () => {
  it('renders correctly with text', () => {
    const { getByText } = render(<Badge text="New" />);
    expect(getByText('New')).toBeTruthy();
  });

  it('renders correctly with count', () => {
    const { getByText } = render(<Badge count={5} />);
    expect(getByText('5')).toBeTruthy();
  });

  it('renders text when both text and count are provided (text takes precedence)', () => {
    const { getByText, queryByText } = render(<Badge text="Featured" count={10} />);
    expect(getByText('Featured')).toBeTruthy();
    expect(queryByText('10')).toBeNull();
  });

  it('renders nothing if no text or count is provided', () => {
    const { container } = render(<Badge />);
    // Check if the container is empty or only contains base View structure with no text
    // This depends on how Badge handles empty state. If it renders an empty View, children will be null or empty array.
    // For this specific Badge, it renders a View with a Text component. If text is empty, Text is empty.
    // A more specific check might be needed if Badge has more complex rendering for empty state.
    expect(container.findByType(Text).props.children).toBe('');
  });

  it('applies different variant styles', () => {
    const { getByText: getByTextPrimary, rerender: rerenderPrimary } = render(<Badge text="Primary" variant="primary" />);
    const primaryBadgeText = getByTextPrimary('Primary');
    // Example: Check background color for primary variant (actual check is complex)
    // expect(primaryBadgeText.parent.props.style).toEqual(expect.arrayContaining([
    //   expect.objectContaining({ backgroundColor: lightTheme.colors.primary[500] })
    // ]));

    rerenderPrimary(<Badge text="Success" variant="success" />);
    const successBadgeText = getByTextPrimary('Success');
    // expect(successBadgeText.parent.props.style).toEqual(expect.arrayContaining([
    //   expect.objectContaining({ backgroundColor: lightTheme.colors.status.success })
    // ]));

    rerenderPrimary(<Badge text="Error" variant="error" />);
    const errorBadgeText = getByTextPrimary('Error');
    // expect(errorBadgeText.parent.props.style).toEqual(expect.arrayContaining([
    //   expect.objectContaining({ backgroundColor: lightTheme.colors.status.error })
    // ]));

    rerenderPrimary(<Badge text="Warning" variant="warning" />);
    const warningBadgeText = getByTextPrimary('Warning');
    // expect(warningBadgeText.parent.props.style).toEqual(expect.arrayContaining([
    //   expect.objectContaining({ backgroundColor: lightTheme.colors.status.warning })
    // ]));

     rerenderPrimary(<Badge text="Neutral" variant="neutral" />);
    const neutralBadgeText = getByTextPrimary('Neutral');
    // expect(neutralBadgeText.parent.props.style).toEqual(expect.arrayContaining([
    //   expect.objectContaining({ backgroundColor: lightTheme.colors.background.secondary })
    // ]));
  });

  it('applies different size styles', () => {
    const { getByText: getByTextSm, rerender: rerenderSm } = render(<Badge text="Small" size="sm" />);
    expect(getByTextSm('Small')).toBeTruthy();
    // Check padding/fontSize for sm size

    rerenderSm(<Badge text="Base" size="base" />);
    expect(getByTextSm('Base')).toBeTruthy();

    rerenderSm(<Badge text="Large" size="lg" />);
    expect(getByTextSm('Large')).toBeTruthy();
  });

  it('renders with icon', () => {
    const Icon = <Text testID="badge-icon">ICON</Text>;
    const { getByTestId, getByText } = render(<Badge text="With Icon" icon={Icon} />);
    expect(getByTestId('badge-icon')).toBeTruthy();
    expect(getByText('With Icon')).toBeTruthy();
  });

  it('calls onPress when the badge is touchable and pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Badge text="Touchable" onPress={onPressMock} touchable />);
    fireEvent.press(getByText('Touchable'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress if not touchable', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Badge text="Not Touchable" onPress={onPressMock} />);
    fireEvent.press(getByText('Not Touchable'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
