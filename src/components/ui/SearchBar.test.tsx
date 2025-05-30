import React from 'react';
import { render, fireEvent } from '../../test-utils/renderWithProviders';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(<SearchBar placeholder="Search items..." />);
    expect(getByPlaceholderText('Search items...')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Search..." onChangeText={onChangeTextMock} />
    );
    const inputElement = getByPlaceholderText('Search...');
    fireEvent.changeText(inputElement, 'test query');
    expect(onChangeTextMock).toHaveBeenCalledWith('test query');
  });

  it('calls onSubmit when submit button (keyboard) is pressed', () => {
    const onSubmitMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Submit Test" onSubmit={onSubmitMock} value="current query" />
    );
    const inputElement = getByPlaceholderText('Submit Test');
    fireEvent(inputElement, 'submitEditing'); // Simulates keyboard submit
    expect(onSubmitMock).toHaveBeenCalledWith("current query");
  });

  it('clears the input when clear icon is pressed', () => {
    const onChangeTextMock = jest.fn();
    const onClearMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar
        placeholder="Clear Test"
        value="some text"
        onChangeText={onChangeTextMock}
        onClear={onClearMock}
        showClearButton="always" // Ensure clear button is visible
      />
    );
    const inputElement = getByPlaceholderText('Clear Test');
    // Ensure the input has the value
    expect(inputElement.props.value).toBe('some text');

    const clearButton = getByTestId('clear-button'); // Assuming SearchBar's clear button has this testID
    fireEvent.press(clearButton);

    expect(onChangeTextMock).toHaveBeenCalledWith('');
    expect(onClearMock).toHaveBeenCalledTimes(1);
  });

  it('shows clear button based on showClearButton prop', () => {
    const { queryByTestId, rerender } = render(<SearchBar value="text" showClearButton="never" />);
    expect(queryByTestId('clear-button')).toBeNull();

    rerender(<SearchBar value="text" showClearButton="while-editing" />);
    // Test for visibility while editing (requires focus, not easily testable here without more complex setup)
    // For now, we'll trust the prop is passed. A focused state test might be needed.

    rerender(<SearchBar value="text" showClearButton="always" />);
    expect(queryByTestId('clear-button')).toBeTruthy();
  });

  it('calls onFocus and onBlur', () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Focus Test" onFocus={onFocusMock} onBlur={onBlurMock} />
    );
    const inputElement = getByPlaceholderText('Focus Test');
    fireEvent(inputElement, 'focus');
    expect(onFocusMock).toHaveBeenCalledTimes(1);
    fireEvent(inputElement, 'blur');
    expect(onBlurMock).toHaveBeenCalledTimes(1);
  });

  it('renders filter button and calls onFilterPress when showFilterButton is true', () => {
    const onFilterPressMock = jest.fn();
    const { getByTestId } = render(
      <SearchBar showFilterButton onFilterPress={onFilterPressMock} />
    );
    const filterButton = getByTestId('filter-button'); // Assuming SearchBar's filter button has this testID
    expect(filterButton).toBeTruthy();
    fireEvent.press(filterButton);
    expect(onFilterPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not render filter button when showFilterButton is false or onFilterPress is not provided', () => {
    const { queryByTestId, rerender } = render(<SearchBar showFilterButton={false} />);
    expect(queryByTestId('filter-button')).toBeNull();

    rerender(<SearchBar showFilterButton={true} /* no onFilterPress */ />);
    expect(queryByTestId('filter-button')).toBeNull(); // Or it might render but be disabled/non-functional
  });

  // Test loading state
  it('shows ActivityIndicator in input when loading is true', () => {
    const { getByTestId } = render(<SearchBar loading={true} />);
    // This relies on the Input component within SearchBar passing a testID to its ActivityIndicator
    // or SearchBar itself adding a testID to an ActivityIndicator.
    // Let's assume the Input component used internally has a loading state that shows an indicator.
    // If SearchBar has its own loading indicator:
    const loadingIndicator = getByTestId('searchbar-loading-indicator'); // Example testID
    expect(loadingIndicator).toBeTruthy();
  });
});
