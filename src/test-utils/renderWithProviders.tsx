import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider, ThemeContextValue, lightTheme, darkTheme } from '../context/ThemeContext'; // Adjust path
import { CartProvider, CartContextType } from '../context/CartContext'; // Adjust path

// Define a minimal initial cart state for tests if needed
const initialTestCartState: CartContextType = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  incrementItem: jest.fn(),
  decrementItem: jest.fn(),
  clearCart: jest.fn(),
  isCartLoading: false, // Assuming a loading state might exist
  cartError: null,     // Assuming an error state might exist
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: ThemeContextValue['theme'];
  initialCartState?: Partial<CartContextType>; // Allow overriding parts of cart state for specific tests
}

const AllTheProviders: React.FC<{
  children: React.ReactNode;
  initialTheme: ThemeContextValue['theme'];
  initialCartStateConfig?: Partial<CartContextType>;
}> = ({
  children,
  initialTheme,
  initialCartStateConfig,
}) => {
  const isDark = initialTheme.name === 'dark';

  // For CartProvider, allow tests to provide an initial state or use defaults
  const cartProviderValue = {
    ...initialTestCartState,
    ...initialCartStateConfig, // Test-specific overrides
  };

  return (
    <ThemeProvider initialTheme={initialTheme} initialIsDark={isDark}>
      <CartProvider initialState={cartProviderValue}>
        {/* Pass merged initial state to CartProvider if it supports it,
            or ensure CartProvider initializes with a predictable state for tests.
            If CartProvider doesn't take initialState prop, you might need to
            mock its internal state or use a different strategy for setting up test conditions.
            For now, assuming CartProvider can be initialized or its hook `useCart` is mockable.
            The CartProvider in this project initializes its own state.
            So, for testing, we'll wrap with the real CartProvider and interact.
            The mock for useCart in ProductCard.test.tsx will be specific to that unit test.
            For integration tests, we want the real CartProvider.
        */}
        {children}
      </CartProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const currentTheme = options?.theme || lightTheme; // Default to lightTheme
  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders
        {...props}
        initialTheme={currentTheme}
        initialCartStateConfig={options?.initialCartState}
      />
    ),
    ...options,
  });
};

export * from '@testing-library/react-native';
export { customRender as render };
