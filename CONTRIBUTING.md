# Contributing to T-Market Mobile

First off, thank you for considering contributing to T-Market Mobile! Your help is essential for making this app great.

This document provides guidelines for contributing to the project. Please read it carefully to ensure a smooth and consistent development process.

## Development Workflow

1.  **Fork the repository** and create your branch from `main`.
2.  **Make your changes** and ensure they adhere to the guidelines below.
3.  **Write tests** for any new functionality or bug fixes.
4.  **Ensure all tests pass** (`npm test`).
5.  **Lint your code** (`npm run lint`) and fix any issues.
6.  **Submit a pull request** with a clear description of your changes.

## Architectural Guidelines

### Component Structure

*   **Reusable UI Components:** Place generic, reusable UI components (e.g., Button, Card, Input, Badge) in the `src/components/ui/` directory. These components should be highly customizable through props and styled using the theme.
*   **Feature-Specific Components:** Components that are specific to a particular feature or screen (e.g., `CartItem`, `ProductDetailView`) should be located within a directory related to that feature (e.g., `src/features/cart/components/`) or directly in `src/components/` if they are used across multiple screens but are not generic enough for `src/components/ui/`.
*   **Screens:** Screen components (entry points for routes) are typically located in the `app/` directory, following the Expo Router conventions.
*   **Layout Components:** Use the layout components from `src/components/layout/Layout.tsx` (e.g., `Layout`, `LayoutWithHeader`, `CenteredLayout`) to ensure consistent screen structure.

### Naming Conventions

*   **Files:**
    *   Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
    *   Hooks: `useCamelCase.ts` (e.g., `useCart.ts`)
    *   Contexts: `PascalCaseContext.tsx` (e.g., `ThemeContext.tsx`)
    *   Services: `camelCase.ts` (e.g., `apiService.ts`)
    *   Types: `PascalCase.ts` or `camelCase.ts` (e.g., `ProductTypes.ts` or `productTypes.ts`)
*   **Components:** `PascalCase` (e.g., `ProductCard`)
*   **Props:** `camelCase` (e.g., `productName`)
*   **Variables & Functions:** `camelCase` (e.g., `const itemCount = 0;`)
*   **Interfaces & Types:** `PascalCase` (e.g., `interface Product { ... }`)

### Props

*   **Clarity:** Prop names should be clear and descriptive.
*   **Optional Props:** Use the `?` operator for optional props (e.g., `title?: string`). Provide default values within the component if necessary.
*   **Boolean Props:** Use descriptive names for boolean props (e.g., `isLoading` instead of `loading`). Avoid negations in boolean prop names (e.g., `showDetails` instead of `hideDetails`).
*   **Spreading Props:** Avoid spreading objects onto components unless you are forwarding all props to an underlying element (e.g., `...textInputProps` onto a `<TextInput />`). Be explicit about the props your component accepts.

### State Management

*   **Local State:** Use `useState` for component-local state.
*   **Shared State (Context API):** For state that needs to be shared across multiple components, use the React Context API.
    *   Contexts are defined in `src/context/`.
    *   Keep contexts focused on a specific domain (e.g., `ThemeContext`, `CartContext`).
    *   Provide custom hooks to consume contexts (e.g., `useTheme()`, `useCart()`).
*   **Global State (Future):** If the application grows significantly and context becomes unwieldy, we may consider a dedicated global state management library (e.g., Zustand, Redux Toolkit). For now, prioritize Context API.

### Styling

*   **Theming:** All components **must** use the `useThemedStyles` hook from `src/context/ThemeContext.tsx` for styling. This ensures consistency and adaptability to different themes.
*   **Style Definitions:** Define styles using a `createStyles` function that accepts the `theme` object:
    ```typescript
    const createStyles = (theme: Theme) => StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.primary,
        padding: theme.spacing[4],
      },
      text: {
        color: theme.colors.text.primary,
        fontSize: theme.typography.fontSize.base,
      },
    });
    ```
*   **Theme Tokens:** Always use tokens from the `theme` object (e.g., `theme.colors.primary[500]`, `theme.spacing[3]`, `theme.typography.fontSize.lg`, `theme.borderRadius.md`) instead of hardcoded values.
*   **StyleSheet API:** Use the React Native `StyleSheet` API for creating style objects.

### API Integration

*   **Service Layer:** API calls should be centralized in a dedicated service layer (e.g., `src/services/api.ts` or feature-specific services like `src/services/productService.ts`).
*   **Async/Await:** Use `async/await` for handling asynchronous API calls.
*   **Error Handling:** Implement proper error handling for API requests.
*   **Type Definitions:** Define clear TypeScript interfaces for API request payloads and responses in `src/types/` (e.g., `src/types/api.ts` or `src/types/product.ts`).

### Testing

*   **Unit Tests:** Write unit tests for individual components, utility functions, hooks, and context logic. Place test files alongside the source files, named `*.test.tsx` or `*.test.ts`.
*   **Integration Tests:** Write integration tests for user flows that involve multiple components interacting.
*   **Testing Libraries:** We use Jest and React Test Renderer (configured in `package.json`).
*   **Coverage:** Aim for a reasonable level of test coverage.

## Code Style

*   **Prettier & ESLint:** The project is configured with Prettier for code formatting and ESLint for linting.
*   **Run `npm run lint`** before committing to catch any issues.
*   **Follow existing code style** for consistency.

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This helps in generating changelogs and keeping commit history clean.
Example: `feat: add user authentication feature`
Example: `fix: correct cart calculation error`
Example: `docs: update contributing guidelines`

---

By following these guidelines, we can build a more maintainable, scalable, and robust application. Thank you for your contribution!
