import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StatusBar,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";
import { useAppNavigation } from "../../hooks/useNavigation";

type HeaderVariant = "default" | "transparent" | "primary";
type HeaderSize = "sm" | "base" | "lg";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  variant?: HeaderVariant;
  size?: HeaderSize;
  showBackButton?: boolean;
  showCartButton?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  centerTitle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  variant = "default",
  size = "base",
  showBackButton = false,
  showCartButton = false,
  leftIcon,
  rightIcon,
  leftComponent,
  rightComponent,
  onLeftPress,
  onRightPress,
  style,
  titleStyle,
  centerTitle = true,
}) => {
  const { goBack, navigateToCart } = useAppNavigation();
  const { isDark } = useTheme();
  const styles = useThemedStyles(createStyles);

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else if (showBackButton) {
      goBack();
    }
  };

  const handleRightPress = () => {
    if (onRightPress) {
      onRightPress();
    } else if (showCartButton) {
      navigateToCart();
    }
  };

  const getLeftIcon = () => {
    if (leftIcon) return leftIcon;
    if (showBackButton) return "arrow-back";
    return null;
  };

  const getRightIcon = () => {
    if (rightIcon) return rightIcon;
    if (showCartButton) return "cart-outline";
    return null;
  };

  const headerStyle = [
    styles.container,
    styles.variants[variant],
    styles.sizes[size],
    style,
  ];

  const titleContainerStyle = [
    styles.titleContainer,
    centerTitle && styles.titleCentered,
  ];

  const titleTextStyle = [
    styles.title,
    styles.titleSizes[size],
    styles.titleVariants[variant],
    titleStyle,
  ];

  return (
    <>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={styles.variants[variant].backgroundColor}
      />
      <SafeAreaView edges={["top"]} style={headerStyle}>
        <View style={styles.content}>
          {/* Section gauche */}
          <View style={styles.leftSection}>
            {leftComponent ||
              ((getLeftIcon() || onLeftPress) && (
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleLeftPress}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {getLeftIcon() && (
                    <Ionicons
                      name={getLeftIcon()}
                      size={styles.iconSizes[size]}
                      color={styles.iconVariants[variant].color}
                    />
                  )}
                </TouchableOpacity>
              ))}
          </View>

          {/* Section centrale */}
          <View style={titleContainerStyle}>
            {title && (
              <Text style={titleTextStyle} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          {/* Section droite */}
          <View style={styles.rightSection}>
            {rightComponent ||
              ((getRightIcon() || onRightPress) && (
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleRightPress}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {getRightIcon() && (
                    <Ionicons
                      name={getRightIcon()}
                      size={styles.iconSizes[size]}
                      color={styles.iconVariants[variant].color}
                    />
                  )}
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.colors.background.primary,
  },

  content: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingHorizontal: theme.spacing[4],
  },

  // Tailles
  sizes: {
    sm: {
      minHeight: 48,
    },
    base: {
      minHeight: theme.dimensions.header,
    },
    lg: {
      minHeight: 72,
    },
  },

  // Variantes
  variants: {
    default: {
      backgroundColor: theme.colors.background.primary,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light,
    },
    transparent: {
      backgroundColor: "transparent",
    },
    primary: {
      backgroundColor: theme.colors.primary[500],
    },
  },

  // Sections
  leftSection: {
    flex: 1,
    alignItems: "flex-start" as const,
  },

  titleContainer: {
    flex: 2,
    alignItems: "flex-start" as const,
  },

  titleCentered: {
    alignItems: "center" as const,
  },

  rightSection: {
    flex: 1,
    alignItems: "flex-end" as const,
  },

  // Boutons
  iconButton: {
    padding: theme.spacing[2],
    borderRadius: theme.borderRadius.full,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  // Texte
  title: {
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  titleSizes: {
    sm: {
      fontSize: theme.typography.fontSize.base,
    },
    base: {
      fontSize: theme.typography.fontSize.lg,
    },
    lg: {
      fontSize: theme.typography.fontSize.xl,
    },
  },

  titleVariants: {
    default: {
      color: theme.colors.text.primary,
    },
    transparent: {
      color: theme.colors.text.primary,
    },
    primary: {
      color: theme.colors.text.inverse,
    },
  },

  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  },

  // Icônes
  iconSizes: {
    sm: theme.dimensions.icon.base,
    base: theme.dimensions.icon.lg,
    lg: theme.dimensions.icon.xl,
  },

  iconVariants: {
    default: {
      color: theme.colors.text.primary,
    },
    transparent: {
      color: theme.colors.text.primary,
    },
    primary: {
      color: theme.colors.text.inverse,
    },
  },
});
