import React from 'react';
import { View, Text } from 'react-native';
import { render, fireEvent, waitFor, act } from '../test-utils/renderWithProviders'; // Ensure path is correct
import { ProductCard } from '../components/ui/ProductCard'; // The component that triggers addToCart
import { useCart, CartProvider } from '../context/CartContext'; // To access cart state for assertions
import { Product } from '../types';
import { useAppNavigation } from '../hooks/useNavigation'; // Mocked in jest-setup.js

// Mock product data (similar to what ProductCard expects)
const mockProduct: Product = {
  id: 'prod123',
  name: 'Test Product for Cart',
  description: 'Amazing product to test cart functionality.',
  price: 99.99,
  stock: 5,
  categoryId: 'catTest',
  images: ['https://via.placeholder.com/150'],
  sku: 'TPC001',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// A simple component to display cart item count for assertion
const CartDisplay: React.FC = () => {
  const { totalItems, cartItems, totalPrice } = useCart();
  return (
    <View>
      <Text testID="cart-total-items">Total Items: {totalItems}</Text>
      <Text testID="cart-total-price">Total Price: {totalPrice.toFixed(2)}</Text>
      {cartItems.map(item => (
        <Text key={item.product.id} testID={`cart-item-${item.product.id}`}>
          {item.product.name} - Qty: {item.quantity}
        </Text>
      ))}
    </View>
  );
};

describe('Add to Cart Integration', () => {
  it('should add a product to the cart and update cart state', async () => {
    const { getByText, findByTestId } = render(
      <>
        <ProductCard product={mockProduct} showAddToCart={true} />
        <CartDisplay />
      </>
      // Note: renderWithProviders already wraps with CartProvider by default
    );

    // Initial cart state assertions (optional, but good for baseline)
    let totalItemsText = await findByTestId('cart-total-items');
    expect(totalItemsText.props.children).toBe('Total Items: 0');

    // Find the "Add to Cart" button on ProductCard and press it
    // ProductCard's button text is "Ajouter" or "Épuisé"
    const addToCartButton = getByText('Ajouter'); // Assuming product is in stock

    // Use act for state updates caused by events
    await act(async () => {
      fireEvent.press(addToCartButton);
    });

    // Assert that the cart state has updated
    // totalItemsText = await findByTestId('cart-total-items'); // Re-query after update
    // expect(totalItemsText.props.children).toBe('Total Items: 1');

    // const productInCart = await findByTestId(`cart-item-${mockProduct.id}`);
    // expect(productInCart.props.children).toBe('Test Product for Cart - Qty: 1');

    // const totalPriceText = await findByTestId('cart-total-price');
    // expect(totalPriceText.props.children).toBe(`Total Price: ${mockProduct.price.toFixed(2)}`);

    // Using waitFor to handle asynchronous state updates in CartContext
    await waitFor(() => {
      expect(getByText('Total Items: 1')).toBeTruthy();
      expect(getByText(`Total Price: ${mockProduct.price.toFixed(2)}`)).toBeTruthy();
      expect(getByText('Test Product for Cart - Qty: 1')).toBeTruthy();
    });

    // Optionally, press again to check quantity update
    await act(async () => {
      fireEvent.press(addToCartButton);
    });

    await waitFor(() => {
      expect(getByText('Total Items: 1')).toBeTruthy(); // Total unique items
      expect(getByText('Test Product for Cart - Qty: 2')).toBeTruthy(); // Quantity updated
      expect(getByText(`Total Price: ${(mockProduct.price * 2).toFixed(2)}`)).toBeTruthy();
    });
  });

  it('should correctly reflect cart state if ProductCard is rendered multiple times for the same product', async () => {
    // This test ensures that multiple ProductCard instances correctly interact with a single cart state.
    const { getAllByText, getByTestId } = render(
      <>
        <ProductCard product={mockProduct} showAddToCart={true} />
        <ProductCard product={mockProduct} showAddToCart={true} />
        <CartDisplay />
      </>
    );

    const addToCartButtons = getAllByText('Ajouter');

    await act(async () => {
      fireEvent.press(addToCartButtons[0]); // Press first card's button
    });

    await waitFor(() => {
      expect(getByTestId('cart-total-items').props.children).toBe('Total Items: 1');
      expect(getByTestId(`cart-item-${mockProduct.id}`).props.children).toBe('Test Product for Cart - Qty: 1');
    });

    await act(async () => {
      fireEvent.press(addToCartButtons[1]); // Press second card's button (same product)
    });

    await waitFor(() => {
      expect(getByTestId('cart-total-items').props.children).toBe('Total Items: 1'); // Still 1 unique item
      expect(getByTestId(`cart-item-${mockProduct.id}`).props.children).toBe('Test Product for Cart - Qty: 2'); // Quantity should be 2
    });
  });
});
