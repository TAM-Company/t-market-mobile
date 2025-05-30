import React from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "base" | "lg" | "xl";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "base",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  onPress,
  ...props
}) => {
  const styles = useThemedStyles(createStyles);

  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.base,
    styles.sizes[size],
    styles.variants[variant],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles.textSizes[size],
    styles.textVariants[variant],
    isDisabled && styles.textDisabled,
    textStyle,
  ];

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {leftIcon && !loading && leftIcon}

      {loading ? (
        <ActivityIndicator
          size="small"
          color={styles.textVariants[variant].color}
          style={styles.loader}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}

      {rightIcon && !loading && rightIcon}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) => ({
  base: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderRadius: theme.borderRadius.base,
    paddingHorizontal: theme.spacing[4],
    ...theme.shadows.sm,
  },

  // Tailles
  sizes: {
    sm: {
      height: theme.dimensions.button.sm,
      paddingHorizontal: theme.spacing[3],
    },
    base: {
      height: theme.dimensions.button.base,
      paddingHorizontal: theme.spacing[4],
    },
    lg: {
      height: theme.dimensions.button.lg,
      paddingHorizontal: theme.spacing[6],
    },
    xl: {
      height: theme.dimensions.button.xl,
      paddingHorizontal: theme.spacing[8],
    },
  },

  // Variantes
  variants: {
    primary: {
      backgroundColor: theme.colors.primary[500],
      borderWidth: 1,
      borderColor: theme.colors.primary[500],
    },
    secondary: {
      backgroundColor: theme.colors.secondary[100],
      borderWidth: 1,
      borderColor: theme.colors.secondary[200],
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.primary[500],
    },
    ghost: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    danger: {
      backgroundColor: theme.colors.error[500],
      borderWidth: 1,
      borderColor: theme.colors.error[500],
    },
  },

  // Styles de texte
  text: {
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: "center" as const,
  },

  textSizes: {
    sm: {
      fontSize: theme.typography.fontSize.sm,
    },
    base: {
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      fontSize: theme.typography.fontSize.lg,
    },
    xl: {
      fontSize: theme.typography.fontSize.xl,
    },
  },

  textVariants: {
    primary: {
      color: theme.colors.text.inverse,
    },
    secondary: {
      color: theme.colors.text.primary,
    },
    outline: {
      color: theme.colors.primary[500],
    },
    ghost: {
      color: theme.colors.primary[500],
    },
    danger: {
      color: theme.colors.text.inverse,
    },
  },

  // États
  fullWidth: {
    width: "100%",
  },

  disabled: {
    opacity: 0.5,
    ...theme.shadows.none,
  },

  textDisabled: {
    opacity: 0.7,
  },

  loader: {
    marginHorizontal: theme.spacing[2],
  },
});
