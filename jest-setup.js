// jest-setup.js
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  };
});

// Comprehensive Mock for Expo Router
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockSetParams = jest.fn();

jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useRouter: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
    push: mockPush,
    replace: mockReplace,
    setParams: mockSetParams,
    canGoBack: jest.fn(() => true), // Or false, depending on test needs
  }),
  useLocalSearchParams: jest.fn(() => ({})), // Default to no params
  useGlobalSearchParams: jest.fn(() => ({})), // Default to no params
  usePathname: jest.fn(() => '/mock-path'),
  Link: jest.fn(({ href, children, ...props }) => {
    const { View, Text, TouchableOpacity } = require('react-native');
    // If 'href' is a string, try to simulate navigation on press
    const onPress = () => {
      if (typeof href === 'string') mockPush(href);
      if (props.onPress) props.onPress();
    };
    // If 'asChild' is true, return children. Otherwise, wrap in TouchableOpacity.
    if (props.asChild) {
      // @ts-ignore
      return React.cloneElement(children, { onPress });
    }
    return <TouchableOpacity onPress={onPress} testID={props.testID || `link-${href}`}><Text>{children}</Text></TouchableOpacity>;
  }),
  Stack: {
    Screen: jest.fn(({ children }) => children), // Mock Stack.Screen
  },
  // Add other Expo Router exports if needed, e.g., Slot, Tabs
  Slot: jest.fn(({ children }) => children), // Mock Slot
}));


// Mock for custom useAppNavigation hook (if it uses useRouter or other navigation primitives)
// This mock assumes useAppNavigation is a simple wrapper around expo-router's hooks for now.
// If useAppNavigation has its own complex logic, it might need a more detailed mock.
const mockNavigateTo = jest.fn();
const mockNavigateToProduct = jest.fn();
const mockNavigateToCategory = jest.fn();
const mockNavigateToCart = jest.fn();
// ... add other specific navigation functions from useAppNavigation

jest.mock('./src/hooks/useNavigation', () => ({ // Adjusted path assuming jest runs from project root
  useAppNavigation: () => ({
    goBack: mockGoBack, // from expo-router mock
    navigateTo: mockNavigateTo,
    navigateToProduct: mockNavigateToProduct,
    navigateToCategory: mockNavigateToCategory,
    navigateToCart: mockNavigateToCart,
    // Add other functions as needed
  }),
}));


jest.mock('@expo/vector-icons', () => {
  const { View, Text } = require('react-native');
  const createIconSet = (glyphMap, fontFamily, fontFile) => {
    const Icon = (props) => {
      // Add a testID that includes the icon name for easier querying
      const testID = props.testID || `icon-${props.name}`;
      return <View {...props} testID={testID}><Text>{props.name}</Text></View>;
    };
    Icon.glyphMap = glyphMap;
    Icon.font = { [fontFamily]: fontFile };
    return Icon;
  };

  return {
    Ionicons: createIconSet({}, 'Ionicons', 'Ionicons.ttf'),
    FontAwesome: createIconSet({}, 'FontAwesome', 'FontAwesome.ttf'),
    MaterialIcons: createIconSet({}, 'MaterialIcons', 'MaterialIcons.ttf'),
    // Add other icon sets if used by your components
  };
});

if (typeof jest !== 'undefined') {
  jest.useFakeTimers(); // Use fake timers for tests involving setTimeout (like mockData.ts)
}

// If using expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: jest.fn(props => <View {...props} />),
  };
});
