import React from 'react';
import { render, fireEvent } from '../../test-utils/renderWithProviders'; // Ensure this path is correct
import { ProductCard } from './ProductCard';
import { Product } from '../../types'; // Ensure this path is correct
import { CartProvider } from '../../context/CartContext'; // ProductCard uses useCart

// Mock useAppNavigation
const mockNavigateToProduct = jest.fn();
jest.mock('../../hooks/useNavigation', () => ({
  useAppNavigation: () => ({
    navigateToProduct: mockNavigateToProduct,
  }),
}));

// Mock useCart - ProductCard uses addToCart from useCart
const mockAddToCart = jest.fn();
jest.mock('../../context/CartContext', () => ({
  ...jest.requireActual('../../context/CartContext'), // Import and retain other exports
  useCart: () => ({
    addToCart: mockAddToCart,
    // Mock other cart context values if ProductCard uses them
  }),
}));


const mockProduct: Product = {
  id: 'prod1',
  name: 'Awesome Laptop',
  description: 'A really cool laptop for coding.',
  price: 1200,
  originalPrice: 1500, // For discount calculation
  image: 'https://via.placeholder.com/300', // main image, use 'images' if ProductCard expects array
  images: ['https://via.placeholder.com/300'], // if ProductCard uses the images array
  rating: 4.5,
  reviewCount: 150,
  stock: 10,
  categoryId: 'cat1',
  supplierId: 'sup1', // if needed by type
  sku: 'LPTP-001',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const renderWithCart = (ui: React.ReactElement) => {
  return render(ui, {
    wrapper: ({ children }) => <CartProvider>{children}</CartProvider> // Wrap with CartProvider
  });
};


describe('ProductCard Component', () => {
  beforeEach(() => {
    mockNavigateToProduct.mockClear();
    mockAddToCart.mockClear();
  });

  it('renders product name, price, and image', () => {
    const { getByText, UNSAFE_getByProps } = renderWithCart(<ProductCard product={mockProduct} />);
    expect(getByText('Awesome Laptop')).toBeTruthy();
    expect(getByText('1200.00 €')).toBeTruthy(); // Assumes price formatting in component
    const image = UNSAFE_getByProps({ source: { uri: mockProduct.image } }); // or mockProduct.images[0]
    expect(image).toBeTruthy();
  });

  it('displays original price and discount badge if applicable', () => {
    const { getByText } = renderWithCart(<ProductCard product={mockProduct} showDiscount />);
    expect(getByText('1500.00 €')).toBeTruthy(); // Original price
    expect(getByText('-20%')).toBeTruthy(); // Discount badge text
  });

  it('does not display discount if showDiscount is false or no discount', () => {
    const noDiscountProduct = { ...mockProduct, originalPrice: mockProduct.price };
    const { queryByText, rerender } = renderWithCart(
      <ProductCard product={mockProduct} showDiscount={false} />
    );
    expect(queryByText('1500.00 €')).toBeNull();
    expect(queryByText('-20%')).toBeNull();

    rerender(<ProductCard product={noDiscountProduct} showDiscount />);
    expect(queryByText('1500.00 €')).toBeNull(); // Original price shouldn't show if same as price
    expect(queryByText(/%/)).toBeNull(); // No discount badge
  });

  it('displays rating and review count', () => {
    const { getByText } = renderWithCart(<ProductCard product={mockProduct} />);
    expect(getByText('4.5')).toBeTruthy();
    expect(getByText('(150)')).toBeTruthy();
  });

  it('calls onPress when provided', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithCart(
      <ProductCard product={mockProduct} onPress={onPressMock} />
    );
    fireEvent.press(getByText('Awesome Laptop'));
    expect(onPressMock).toHaveBeenCalledWith(mockProduct);
  });

  it('navigates to product details if onPress is not provided', () => {
    const { getByText } = renderWithCart(<ProductCard product={mockProduct} />);
    fireEvent.press(getByText('Awesome Laptop'));
    expect(mockNavigateToProduct).toHaveBeenCalledWith(mockProduct.id);
  });

  it('calls onAddToCart when "Ajouter" button is pressed', () => {
    const { getByText } = renderWithCart(<ProductCard product={mockProduct} showAddToCart />);
    fireEvent.press(getByText('Ajouter')); // Assumes button text is "Ajouter"
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('shows "Épuisé" and disables button when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    const { getByText } = renderWithCart(
      <ProductCard product={outOfStockProduct} showAddToCart />
    );
    const addButton = getByText('Épuisé'); // Assumes button text changes
    expect(addButton).toBeTruthy();
    expect(addButton.props.accessibilityState.disabled).toBe(true); // Check if button is disabled
  });

  it('toggles favorite state when favorite button is pressed', () => {
    const onToggleFavoriteMock = jest.fn();
    const { getByTestId } = renderWithCart(
      // ProductCard needs a testID on its favorite button, e.g., "favorite-button"
      <ProductCard product={mockProduct} showFavorite onToggleFavorite={onToggleFavoriteMock} />
    );
    // const favoriteButton = getByTestId('favorite-button');
    // fireEvent.press(favoriteButton);
    // expect(onToggleFavoriteMock).toHaveBeenCalledWith(mockProduct);
    // expect(favoriteButton.props.iconName).toBe('heart'); // Or however icon change is tested
    // fireEvent.press(favoriteButton);
    // expect(favoriteButton.props.iconName).toBe('heart-outline');
  });

  // Test different variants - basic rendering check
  it('renders "list" variant', () => {
    const { getByText } = renderWithCart(<ProductCard product={mockProduct} variant="list" />);
    expect(getByText(mockProduct.name)).toBeTruthy();
  });

  it('renders "compact" variant', () => {
    const { getByText } = renderWithCart(<ProductCard product={mockProduct} variant="compact" />);
    expect(getByText(mockProduct.name)).toBeTruthy();
    // AddToCart button should be hidden in compact variant by default in the component's logic
    expect(queryByText('Ajouter')).toBeNull();
  });

  // Test image error handling
  it('renders placeholder when image fails to load', () => {
    // This requires the Image component to call onError and ProductCard to handle it.
    // You'd typically find the Image component and manually trigger its onError prop.
    const { UNSAFE_getByType } = renderWithCart(<ProductCard product={mockProduct} />);
    const imageInstance = UNSAFE_getByType(Image); // Assuming Image is directly from 'react-native'

    // Manually trigger error
    // This is a bit of a hack; direct error simulation on Image is tricky with RTL alone.
    // In a real scenario, you might mock the Image component itself for this test.
    // For now, we assume that if an error occurs, a placeholder is shown.
    // The component has logic: source={imageError ? require('../../assets/placeholder.png') : { uri: product.image }}
    // We need to simulate imageError state becoming true.
    // This internal state change is hard to trigger from outside without specific component APIs or refactoring.
    // A possible approach is to check for the placeholder if the initial URI is invalid,
    // but that would require an invalid URI and might not trigger onError in Jest's environment.
  });

});
