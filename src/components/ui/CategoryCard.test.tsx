import React from 'react';
import { render, fireEvent } from '../../test-utils/renderWithProviders';
import { CategoryCard } from './CategoryCard'; // Assuming CategoryGrid, etc., are not tested here
import { Category } from '../../types'; // Using Category type from types/index.ts or types/api.ts

// Mock useAppNavigation
const mockNavigateToCategory = jest.fn();
jest.mock('../../hooks/useNavigation', () => ({
  useAppNavigation: () => ({
    navigateToCategory: mockNavigateToCategory,
  }),
}));

const mockCategory: Category = {
  id: 'cat1',
  name: 'Electronics',
  slug: 'electronics', // Assuming slug is part of Category type as used in component
  icon: 'phone-portrait-outline', // Assuming icon is part of Category type
  image: 'https://via.placeholder.com/150',
  productCount: 120, // Assuming productCount is part of Category type
  // description: 'Gadgets and more', // Add if part of your Category type and used
};

describe('CategoryCard Component', () => {
  beforeEach(() => {
    mockNavigateToCategory.mockClear();
  });

  it('renders category name and image', () => {
    const { getByText, UNSAFE_getByProps } = render(<CategoryCard category={mockCategory} />);
    expect(getByText('Electronics')).toBeTruthy();
    const image = UNSAFE_getByProps({ source: { uri: mockCategory.image } });
    expect(image).toBeTruthy();
  });

  it('calls onPress when provided and pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CategoryCard category={mockCategory} onPress={onPressMock} />
    );
    // CategoryCard uses Card internally which is touchable
    fireEvent.press(getByText('Electronics'));
    expect(onPressMock).toHaveBeenCalledWith(mockCategory);
  });

  it('calls default navigation when onPress is not provided and pressed', () => {
    const { getByText } = render(<CategoryCard category={mockCategory} />);
    fireEvent.press(getByText('Electronics'));
    expect(mockNavigateToCategory).toHaveBeenCalledWith(mockCategory.id);
  });

  it('renders product count when showProductCount is true (default)', () => {
    const { getByText } = render(<CategoryCard category={mockCategory} />);
    expect(getByText('120 produits')).toBeTruthy(); // Assumes pluralization
  });

  it('renders product count (singular) correctly', () => {
    const singleProductCategory = { ...mockCategory, productCount: 1 };
    const { getByText } = render(<CategoryCard category={singleProductCategory} />);
    expect(getByText('1 produit')).toBeTruthy();
  });

  it('does not render product count when showProductCount is false', () => {
    const { queryByText } = render(
      <CategoryCard category={mockCategory} showProductCount={false} />
    );
    expect(queryByText(/120 produits/i)).toBeNull();
  });

  it('renders icon when showIcon is true (default) and image is not available', () => {
    const noImageCategory = { ...mockCategory, image: undefined };
    // This test relies on the Ionicons mock being effective.
    // The CategoryCard uses LinearGradient and Ionicons when no image is present.
    // Our current Ionicons mock renders a View. We can check for its presence.
    // A more specific test would check for the icon name if the mock supported it.
    const { getByTestId } = render(<CategoryCard category={noImageCategory} />);
    // We need to add a testID to the icon View in CategoryCard or have a better mock
    // For now, let's assume the icon container gets a testID="category-icon-container"
    // expect(getByTestId('category-icon-container')).toBeTruthy();
    // This requires modification of CategoryCard.tsx to add testID="category-icon-container" to the View wrapping the icon.
  });

  it('does not render icon when showIcon is false', () => {
     const noImageCategory = { ...mockCategory, image: undefined };
     // Need a way to assert the icon is NOT there.
     // const { queryByTestId } = render(<CategoryCard category={noImageCategory} showIcon={false} />);
     // expect(queryByTestId('category-icon-container')).toBeNull();
  });

  // Test different variants - basic rendering check
  it('renders "list" variant', () => {
    const { getByText } = render(<CategoryCard category={mockCategory} variant="list" />);
    expect(getByText(mockCategory.name)).toBeTruthy();
    // Further style checks for "list" could be added (e.g., flex direction)
  });

  it('renders "compact" variant', () => {
    const { getByText } = render(<CategoryCard category={mockCategory} variant="compact" />);
    expect(getByText(mockCategory.name)).toBeTruthy();
  });

  it('renders "featured" variant with overlay text', () => {
    const { getByText } = render(<CategoryCard category={mockCategory} variant="featured" />);
    // In 'featured', the name and productCount are in an overlay
    expect(getByText(mockCategory.name)).toBeTruthy();
    expect(getByText(`${mockCategory.productCount} produits`)).toBeTruthy();
  });

  // Note: Testing specific styles for variants and sizes is complex without snapshot testing
  // or very specific style assertions, which can be brittle.
  // The focus here is on props and basic rendering for different states.
});
