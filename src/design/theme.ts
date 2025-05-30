import {
  BorderRadius,
  Colors,
  Dimensions,
  Shadows,
  Spacing,
  Typography,
} from "./tokens";

// Interface pour le thème
export interface Theme {
  colors: typeof Colors;
  typography: typeof Typography;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  shadows: typeof Shadows;
  dimensions: typeof Dimensions;
  isDark: boolean;
}

// Thème clair
export const lightTheme: Theme = {
  colors: {
    ...Colors,
    background: {
      primary: Colors.neutral.white,
      secondary: Colors.neutral[50],
      tertiary: Colors.neutral[100],
      overlay: "rgba(0, 0, 0, 0.5)",
      card: Colors.neutral.white,
      modal: "rgba(0, 0, 0, 0.8)",
    },
    text: {
      primary: Colors.neutral[900],
      secondary: Colors.neutral[600],
      tertiary: Colors.neutral[400],
      inverse: Colors.neutral.white,
      link: Colors.primary[500],
      error: Colors.error[500],
      success: Colors.success[500],
      warning: Colors.warning[500],
    },
    border: {
      light: Colors.neutral[200],
      medium: Colors.neutral[300],
      dark: Colors.neutral[400],
      focus: Colors.primary[500],
      error: Colors.error[500],
    },
  },
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  dimensions: Dimensions,
  isDark: false,
};

// Thème sombre
export const darkTheme: Theme = {
  colors: {
    ...Colors,
    background: {
      primary: Colors.neutral[900],
      secondary: Colors.neutral[800],
      tertiary: Colors.neutral[700],
      overlay: "rgba(0, 0, 0, 0.7)",
      card: Colors.neutral[800],
      modal: "rgba(0, 0, 0, 0.9)",
    },
    text: {
      primary: Colors.neutral[100],
      secondary: Colors.neutral[300],
      tertiary: Colors.neutral[500],
      inverse: Colors.neutral[900],
      link: Colors.primary[400],
      error: Colors.error[400],
      success: Colors.success[400],
      warning: Colors.warning[400],
    },
    border: {
      light: Colors.neutral[700],
      medium: Colors.neutral[600],
      dark: Colors.neutral[500],
      focus: Colors.primary[400],
      error: Colors.error[400],
    },
  },
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: {
    ...Shadows,
    // Ajuster les ombres pour le mode sombre
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    base: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  dimensions: Dimensions,
  isDark: true,
};

// Thème par défaut
export const defaultTheme = lightTheme;

// Utilitaires pour les styles responsifs
export const createResponsiveStyle = (styles: {
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
}) => {
  // Pour React Native, on peut utiliser Dimensions pour adapter
  // Cette fonction peut être étendue selon les besoins
  return styles.sm || {};
};

// Utilitaires pour les variantes de composants
export const createVariant = (
  baseStyle: any,
  variants: Record<string, any>
) => {
  return (variant: string = "default") => ({
    ...baseStyle,
    ...variants[variant],
  });
};

// Utilitaires pour les tailles
export const createSizeVariant = (sizes: Record<string, any>) => {
  return (size: string = "base") => sizes[size] || sizes.base;
};
