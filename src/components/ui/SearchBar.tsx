import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";

type SearchBarVariant = "default" | "filled" | "outlined";
type SearchBarSize = "sm" | "base" | "lg";

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  variant?: SearchBarVariant;
  size?: SearchBarSize;
  onChangeText?: (text: string) => void;
  onSubmit?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  showClearButton?: boolean;
  showSearchIcon?: boolean;
  showFilterButton?: boolean;
  onFilterPress?: () => void;
  autoFocus?: boolean;
  editable?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  placeholder = "Rechercher...",
  variant = "default",
  size = "base",
  onChangeText,
  onSubmit,
  onFocus,
  onBlur,
  onClear,
  showClearButton = true,
  showSearchIcon = true,
  showFilterButton = false,
  onFilterPress,
  autoFocus = false,
  editable = true,
  style,
  inputStyle,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  const styles = useThemedStyles(createStyles);

  const currentValue = value !== undefined ? value : internalValue;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onBlur?.();
  };

  const handleChangeText = (text: string) => {
    if (value === undefined) {
      setInternalValue(text);
    }
    onChangeText?.(text);
  };

  const handleSubmit = () => {
    onSubmit?.(currentValue);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    const newValue = "";
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChangeText?.(newValue);
    onClear?.();
    inputRef.current?.focus();
  };

  const containerStyle = [
    styles.container,
    styles.variants[variant],
    styles.sizes[size],
    isFocused && styles.focused,
    !editable && styles.disabled,
    style,
  ];

  const inputTextStyle = [styles.input, styles.inputSizes[size], inputStyle];

  const animatedBorderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      styles.variants[variant].borderColor || "transparent",
      styles.focused.borderColor,
    ],
  });

  const getLeftIcon = () => {
    if (leftIcon) return leftIcon;
    if (showSearchIcon) return "search";
    return null;
  };

  const getRightIcon = () => {
    if (rightIcon) return rightIcon;
    if (showFilterButton) return "filter";
    return null;
  };

  return (
    <Animated.View
      style={[
        containerStyle,
        variant === "outlined" && { borderColor: animatedBorderColor },
      ]}
    >
      {/* Icône gauche */}
      {getLeftIcon() && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onLeftIconPress}
          disabled={!onLeftIconPress}
        >
          <Ionicons
            name={getLeftIcon()!}
            size={styles.iconSizes[size]}
            color={styles.iconColor}
          />
        </TouchableOpacity>
      )}

      {/* Champ de saisie */}
      <TextInput
        ref={inputRef}
        style={inputTextStyle}
        value={currentValue}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholderColor}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmit}
        autoFocus={autoFocus}
        editable={editable}
        returnKeyType="search"
        clearButtonMode="never"
      />

      {/* Bouton effacer */}
      {showClearButton && currentValue.length > 0 && (
        <TouchableOpacity style={styles.iconButton} onPress={handleClear}>
          <Ionicons
            name="close-circle"
            size={styles.iconSizes[size]}
            color={styles.clearIconColor}
          />
        </TouchableOpacity>
      )}

      {/* Icône droite */}
      {getRightIcon() && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onRightIconPress || onFilterPress}
          disabled={!onRightIconPress && !onFilterPress}
        >
          <Ionicons
            name={getRightIcon()!}
            size={styles.iconSizes[size]}
            color={styles.iconColor}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

// Composant SearchBar avec suggestions
export const SearchBarWithSuggestions: React.FC<
  SearchBarProps & {
    suggestions?: string[];
    onSuggestionPress?: (suggestion: string) => void;
    maxSuggestions?: number;
  }
> = ({
  suggestions = [],
  onSuggestionPress,
  maxSuggestions = 5,
  ...searchBarProps
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const styles = useThemedStyles(createStyles);

  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion
        .toLowerCase()
        .includes((searchBarProps.value || "").toLowerCase())
    )
    .slice(0, maxSuggestions);

  const handleFocus = () => {
    setShowSuggestions(true);
    searchBarProps.onFocus?.();
  };

  const handleBlur = () => {
    // Délai pour permettre la sélection d'une suggestion
    setTimeout(() => setShowSuggestions(false), 150);
    searchBarProps.onBlur?.();
  };

  const handleSuggestionPress = (suggestion: string) => {
    onSuggestionPress?.(suggestion);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.suggestionContainer}>
      <SearchBar
        {...searchBarProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Ionicons
                name="search"
                size={16}
                color={styles.suggestionIconColor}
                style={styles.suggestionIcon}
              />
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing[3],
  },

  // Tailles
  sizes: {
    sm: {
      height: 40,
    },
    base: {
      height: theme.dimensions.input.base,
    },
    lg: {
      height: 56,
    },
  },

  // Variantes
  variants: {
    default: {
      backgroundColor: theme.colors.background.secondary,
    },
    filled: {
      backgroundColor: theme.colors.background.tertiary,
    },
    outlined: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.border.light,
    },
  },

  focused: {
    borderColor: theme.colors.primary[500],
    borderWidth: 1,
  },

  disabled: {
    opacity: 0.6,
  },

  // Input
  input: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing[2],
  },

  inputSizes: {
    sm: {
      fontSize: theme.typography.fontSize.sm,
    },
    base: {
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      fontSize: theme.typography.fontSize.lg,
    },
  },

  // Boutons d'icône
  iconButton: {
    padding: theme.spacing[1],
  },

  iconSizes: {
    sm: 16,
    base: 20,
    lg: 24,
  },

  // Couleurs
  iconColor: theme.colors.text.secondary,
  clearIconColor: theme.colors.text.tertiary,
  placeholderColor: theme.colors.text.placeholder,

  // Suggestions
  suggestionContainer: {
    position: "relative" as const,
  },

  suggestionsBox: {
    position: "absolute" as const,
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing[1],
    ...theme.shadows.md,
    zIndex: 1000,
  },

  suggestionItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    padding: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  suggestionIcon: {
    marginRight: theme.spacing[2],
  },

  suggestionText: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
  },

  suggestionIconColor: theme.colors.text.tertiary,
});
