// Design Tokens - Système de design centralisé

// Palette de couleurs
export const Colors = {
  // Couleurs principales
  primary: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E", // Rouge principal
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B",
  },

  // Couleurs secondaires
  secondary: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923",
  },

  // Couleurs d'état
  success: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    500: "#38A169",
    600: "#2F855A",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    500: "#F59E0B",
    600: "#D97706",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    500: "#EF4444",
    600: "#DC2626",
  },

  info: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    500: "#3B82F6",
    600: "#2563EB",
  },

  // Couleurs neutres
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // Couleurs de fond
  background: {
    primary: "#FFFFFF",
    secondary: "#F8FAFC",
    tertiary: "#F1F5F9",
    overlay: "rgba(0, 0, 0, 0.5)",
    card: "#FFFFFF",
    modal: "rgba(0, 0, 0, 0.8)",
  },

  // Couleurs de texte
  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
    link: "#3B82F6",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
  },

  // Couleurs de bordure
  border: {
    light: "#E5E7EB",
    medium: "#D1D5DB",
    dark: "#9CA3AF",
    focus: "#3B82F6",
    error: "#EF4444",
  },
};

// Typographie
export const Typography = {
  fontFamily: {
    primary: "System",
    mono: "SpaceMono",
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
  },

  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Espacement
export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
};

// Rayons de bordure
export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
};

// Ombres
export const Shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 24,
  },
};

// Dimensions
export const Dimensions = {
  // Hauteurs communes
  button: {
    sm: 32,
    base: 40,
    lg: 48,
    xl: 56,
  },

  input: {
    sm: 32,
    base: 40,
    lg: 48,
  },

  header: 56,
  tabBar: 60,

  // Largeurs communes
  container: {
    sm: 320,
    md: 768,
    lg: 1024,
    xl: 1280,
  },

  // Icônes
  icon: {
    xs: 12,
    sm: 16,
    base: 20,
    lg: 24,
    xl: 32,
    "2xl": 40,
  },
};

// Animations
export const Animations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  easing: {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },
};

// Breakpoints pour responsive design
export const Breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Z-index
export const ZIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};
