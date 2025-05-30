import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { render, fireEvent, waitFor, act } from '../test-utils/renderWithProviders';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterModal } from '../components/FilterModal'; // Assuming FilterModal is used
import { getProducts } from '../data/mockData'; // We'll mock this
import { Product, FilterOptions, GetProductsResponse } from '../types';
import { Button } from '../components/ui/Button'; // For a filter trigger

// Mock the getProducts function from mockData.ts
jest.mock('../data/mockData', () => ({
  ...jest.requireActual('../data/mockData'), // Import and retain other exports
  getProducts: jest.fn(),
}));

const mockedGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

// A simplified screen for testing search and filter functionality
const ProductSearchScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    inStock: false,
    sortBy: 'default',
  });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (currentFilters: FilterOptions) => {
    setLoading(true);
    // console.log('Fetching products with filters:', currentFilters);
    try {
      const response: GetProductsResponse = await mockedGetProducts({
        searchQuery: currentFilters.searchQuery,
        categoryId: currentFilters.category,
        minPrice: currentFilters.minPrice,
        maxPrice: currentFilters.maxPrice,
        inStock: currentFilters.inStock,
        sortBy: currentFilters.sortBy,
        // page, limit, etc.
      });
      setProducts(response.products);
    } catch (error) {
      console.error("Failed to fetch products for test screen:", error);
      setProducts([]); // Clear products on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  const handleSearchSubmit = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(prev => ({ ...prev, ...newFilters, searchQuery: prev.searchQuery })); // Preserve search query from SearchBar
    setIsFilterModalVisible(false);
  };

  const handleSearchBarChange = (query: string) => {
    setSearchQuery(query);
    // Optional: Fetch products on text change (debounced) or only on submit
    // For this test, we'll use explicit submit from SearchBar
  };


  return (
    <View>
      <SearchBar
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearchBarChange}
        onSubmit={handleSearchSubmit}
        showFilterButton
        onFilterPress={() => setIsFilterModalVisible(true)}
        testID="product-search-bar"
      />
      <Button title="Open Filters" onPress={() => setIsFilterModalVisible(true)} testID="open-filters-button" />

      {loading && <Text testID="loading-indicator">Loading...</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View testID={`product-item-${item.id}`}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
        ListEmptyComponent={<Text testID="empty-product-list">No products found.</Text>}
        testID="product-list"
      />
      {isFilterModalVisible && (
        <FilterModal
          visible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
          currentFilters={filters}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </View>
  );
};


// Mock product data for getProducts
const sampleProducts: Product[] = [
  { id: '1', name: 'Laptop Pro', categoryId: 'electronics', price: 1200, stock: 10, sku: 'LP001', images:[], createdAt: '', updatedAt: '', description: '' },
  { id: '2', name: 'Coffee Maker', categoryId: 'home', price: 80, stock: 5, sku: 'CM002', images:[], createdAt: '', updatedAt: '', description: '' },
  { id: '3', name: 'Running Shoes', categoryId: 'sports', price: 150, stock: 0, sku: 'RS003', images:[], createdAt: '', updatedAt: '', description: '' }, // Out of stock
  { id: '4', name: 'Gaming Laptop', categoryId: 'electronics', price: 1800, stock: 7, sku: 'LP002', images:[], createdAt: '', updatedAt: '', description: '' },
];

const initialMockResponse: GetProductsResponse = {
  products: sampleProducts,
  total: sampleProducts.length,
  page: 1,
  limit: 10,
};

describe('Product Search and Filter Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup getProducts to return initial full list by default
    mockedGetProducts.mockResolvedValue(initialMockResponse);
  });

  // Need to use fake timers for any `setTimeout` in `getProducts` from `mockData.ts`
  // jest.useFakeTimers(); // Already in jest-setup.js

  it('should fetch initial products on render', async () => {
    render(<ProductSearchScreen />);
    // jest.runAllTimers(); // If getProducts has a setTimeout

    await waitFor(() => {
      expect(mockedGetProducts).toHaveBeenCalledTimes(1); // Initial fetch
      expect(mockedGetProducts).toHaveBeenCalledWith(expect.objectContaining({ searchQuery: '' }));
    });

    for (const product of sampleProducts) {
      await waitFor(() => expect(await screen.findByText(product.name)).toBeTruthy());
    }
  });

  it('should search for products when search query is submitted', async () => {
    render(<ProductSearchScreen />);
    // jest.runAllTimers(); // Initial fetch
    await waitFor(() => expect(mockedGetProducts).toHaveBeenCalledTimes(1));


    const searchBarInput = await screen.findByTestId('product-search-bar').then(el => el.findByType(TextInput));

    mockedGetProducts.mockImplementation(async (params) => {
      const filtered = sampleProducts.filter(p => p.name.toLowerCase().includes(params?.searchQuery?.toLowerCase() || ''));
      return { products: filtered, total: filtered.length, page: 1, limit: 10 };
    });

    await act(async () => {
      fireEvent.changeText(searchBarInput, 'Laptop');
      fireEvent(searchBarInput, 'submitEditing'); // Assuming SearchBar's onSubmit calls this
      // jest.runAllTimers(); // For the setTimeout in the mocked getProducts
    });

    await waitFor(() => {
      expect(mockedGetProducts).toHaveBeenCalledTimes(2); // Initial + search
      expect(mockedGetProducts).toHaveBeenCalledWith(expect.objectContaining({ searchQuery: 'Laptop' }));
    });

    await waitFor(async () => {
      expect(await screen.findByText('Laptop Pro')).toBeTruthy();
      expect(await screen.findByText('Gaming Laptop')).toBeTruthy();
      expect(screen.queryByText('Coffee Maker')).toBeNull();
    });
  });

  it('should open filter modal and apply filters', async () => {
    render(<ProductSearchScreen />);
    // jest.runAllTimers(); // Initial fetch
    await waitFor(() => expect(mockedGetProducts).toHaveBeenCalledTimes(1));

    const openFilterButton = await screen.findByTestId('open-filters-button');
    await act(async () => {
      fireEvent.press(openFilterButton);
    });

    // FilterModal should be visible
    await waitFor(async () => {
      expect(await screen.findByText('Recherche avancée')).toBeTruthy(); // FilterModal title
    });

    // Simulate applying a filter (e.g., "inStock")
    // This requires interacting with FilterModal's internal components.
    // For simplicity, let's assume FilterModal calls onApplyFilters with specific values.
    // We need to find the "In Stock" switch and press it.
    // And then the "Apply" button.

    const inStockSwitch = await screen.findByText('Produits en stock uniquement').then(el => el.parent.findByType(Switch));
    await act(async () => {
      fireEvent(inStockSwitch, 'valueChange', true); // Toggle the switch
    });

    mockedGetProducts.mockImplementation(async (params) => {
        const filtered = sampleProducts.filter(p => params?.inStock ? p.stock > 0 : true);
        return { products: filtered, total: filtered.length, page: 1, limit: 10 };
    });

    const applyButton = await screen.findByText('Appliquer');
    await act(async () => {
      fireEvent.press(applyButton);
      // jest.runAllTimers();
    });

    await waitFor(() => {
      expect(mockedGetProducts).toHaveBeenCalledTimes(2); // Initial + filter apply
      expect(mockedGetProducts).toHaveBeenCalledWith(expect.objectContaining({ inStock: true }));
    });

    await waitFor(async () => {
      expect(await screen.findByText('Laptop Pro')).toBeTruthy(); // In stock
      expect(await screen.findByText('Coffee Maker')).toBeTruthy(); // In stock
      expect(screen.queryByText('Running Shoes')).toBeNull(); // Out of stock
      expect(await screen.findByText('Gaming Laptop')).toBeTruthy(); // In stock
    });

    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByText('Recherche avancée')).toBeNull();
    });
  });
});

// Helper to import screen for waitFor (if not already global)
import { screen } from '@testing-library/react-native';
// Make sure TextInput and Switch are imported for type checking in tests if needed
import { TextInput, Switch } from 'react-native';
