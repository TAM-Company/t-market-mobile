import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";

type InputSize = "sm" | "base" | "lg";
type InputVariant = "default" | "filled" | "outline";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  hint?: string;
  size?: InputSize;
  variant?: InputVariant;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  required?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      size = "base",
      variant = "outline",
      leftIcon,
      rightIcon,
      onRightIconPress,
      required = false,
      disabled = false,
      containerStyle,
      inputStyle,
      labelStyle,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const styles = useThemedStyles(createStyles);

    const isPassword = secureTextEntry;
    const showPasswordToggle = isPassword && !rightIcon;
    const actualRightIcon = showPasswordToggle
      ? isPasswordVisible
        ? "eye-off"
        : "eye"
      : rightIcon;

    const handleRightIconPress = () => {
      if (showPasswordToggle) {
        setIsPasswordVisible(!isPasswordVisible);
      } else if (onRightIconPress) {
        onRightIconPress();
      }
    };

    const inputContainerStyle = [
      styles.inputContainer,
      styles.sizes[size],
      styles.variants[variant],
      isFocused && styles.focused,
      error && styles.error,
      disabled && styles.disabled,
    ];

    const textInputStyle = [
      styles.input,
      styles.inputSizes[size],
      leftIcon && styles.inputWithLeftIcon,
      (actualRightIcon || showPasswordToggle) && styles.inputWithRightIcon,
      disabled && styles.inputDisabled,
      inputStyle,
    ];

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        <View style={inputContainerStyle}>
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={styles.iconSizes[size]}
              color={styles.iconColor.color}
              style={styles.leftIcon}
            />
          )}

          <TextInput
            ref={ref}
            style={textInputStyle}
            secureTextEntry={isPassword && !isPasswordVisible}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor={styles.placeholder.color}
            {...props}
          />

          {actualRightIcon && (
            <TouchableOpacity
              onPress={handleRightIconPress}
              style={styles.rightIconContainer}
              disabled={!showPasswordToggle && !onRightIconPress}
            >
              <Ionicons
                name={actualRightIcon}
                size={styles.iconSizes[size]}
                color={styles.iconColor.color}
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {hint && !error && <Text style={styles.hintText}>{hint}</Text>}
      </View>
    );
  }
);

Input.displayName = "Input";

const createStyles = (theme: Theme) => ({
  container: {
    marginBottom: theme.spacing[4],
  },

  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },

  required: {
    color: theme.colors.error[500],
  },

  inputContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    borderRadius: theme.borderRadius.base,
    borderWidth: 1,
  },

  // Tailles
  sizes: {
    sm: {
      height: theme.dimensions.input.sm,
      paddingHorizontal: theme.spacing[3],
    },
    base: {
      height: theme.dimensions.input.base,
      paddingHorizontal: theme.spacing[4],
    },
    lg: {
      height: theme.dimensions.input.lg,
      paddingHorizontal: theme.spacing[5],
    },
  },

  // Variantes
  variants: {
    default: {
      backgroundColor: theme.colors.background.primary,
      borderColor: theme.colors.border.light,
    },
    filled: {
      backgroundColor: theme.colors.background.secondary,
      borderColor: "transparent",
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: theme.colors.border.medium,
    },
  },

  // États
  focused: {
    borderColor: theme.colors.border.focus,
    ...theme.shadows.sm,
  },

  error: {
    borderColor: theme.colors.border.error,
  },

  disabled: {
    backgroundColor: theme.colors.background.tertiary,
    opacity: 0.6,
  },

  // Input
  input: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.primary,
    padding: 0, // Reset default padding
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

  inputWithLeftIcon: {
    marginLeft: theme.spacing[2],
  },

  inputWithRightIcon: {
    marginRight: theme.spacing[2],
  },

  inputDisabled: {
    color: theme.colors.text.tertiary,
  },

  // Icônes
  leftIcon: {
    marginRight: theme.spacing[2],
  },

  rightIconContainer: {
    padding: theme.spacing[1],
  },

  iconSizes: {
    sm: theme.dimensions.icon.sm,
    base: theme.dimensions.icon.base,
    lg: theme.dimensions.icon.lg,
  },

  iconColor: {
    color: theme.colors.text.secondary,
  },

  // Messages
  errorText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.error,
    marginTop: theme.spacing[1],
  },

  hintText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing[1],
  },

  placeholder: {
    color: theme.colors.text.tertiary,
  },
});
