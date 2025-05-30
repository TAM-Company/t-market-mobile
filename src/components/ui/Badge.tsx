import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";
type BadgeSize = "xs" | "sm" | "base" | "lg";
type BadgeShape = "rounded" | "pill" | "square";

interface BadgeProps {
  children?: React.ReactNode;
  text?: string;
  count?: number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  dot?: boolean;
  outline?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  maxCount?: number;
  showZero?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  text,
  count,
  variant = "primary",
  size = "base",
  shape = "rounded",
  dot = false,
  outline = false,
  style,
  textStyle,
  maxCount = 99,
  showZero = false,
}) => {
  const styles = useThemedStyles(createStyles);

  // Détermine le contenu à afficher
  const getContent = () => {
    if (dot) return null;
    if (children) return children;
    if (text) return text;
    if (count !== undefined) {
      if (count === 0 && !showZero) return null;
      return count > maxCount ? `${maxCount}+` : count.toString();
    }
    return null;
  };

  const content = getContent();

  // Ne pas rendre si pas de contenu et pas un dot
  if (!content && !dot) return null;

  const badgeStyle = [
    styles.base,
    styles.variants[variant],
    styles.sizes[size],
    styles.shapes[shape],
    outline && styles.outline,
    dot && styles.dot,
    style,
  ];

  const badgeTextStyle = [
    styles.text,
    styles.textSizes[size],
    styles.textVariants[variant],
    outline && styles.textOutline,
    textStyle,
  ];

  return (
    <View style={badgeStyle}>
      {content && (
        <Text style={badgeTextStyle} numberOfLines={1}>
          {content}
        </Text>
      )}
    </View>
  );
};

// Badge avec positionnement absolu (pour les notifications)
export const PositionedBadge: React.FC<
  BadgeProps & {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    offset?: { x?: number; y?: number };
  }
> = ({ position = "top-right", offset = {}, style, ...badgeProps }) => {
  const styles = useThemedStyles(createStyles);

  const positionStyle = [
    styles.positioned,
    styles.positions[position],
    offset.x !== undefined && {
      [position.includes("right") ? "right" : "left"]: offset.x,
    },
    offset.y !== undefined && {
      [position.includes("top") ? "top" : "bottom"]: offset.y,
    },
    style,
  ];

  return <Badge {...badgeProps} style={positionStyle} />;
};

// Badge de statut avec icône
export const StatusBadge: React.FC<{
  status: "online" | "offline" | "busy" | "away";
  size?: BadgeSize;
  style?: ViewStyle;
}> = ({ status, size = "base", style }) => {
  const styles = useThemedStyles(createStyles);

  const statusVariants = {
    online: "success" as BadgeVariant,
    offline: "neutral" as BadgeVariant,
    busy: "error" as BadgeVariant,
    away: "warning" as BadgeVariant,
  };

  return (
    <Badge
      variant={statusVariants[status]}
      size={size}
      shape="pill"
      dot
      style={style}
    />
  );
};

// Badge numérique pour les notifications
export const NotificationBadge: React.FC<{
  count: number;
  maxCount?: number;
  showZero?: boolean;
  size?: BadgeSize;
  style?: ViewStyle;
}> = ({ count, maxCount = 99, showZero = false, size = "sm", style }) => {
  if (count === 0 && !showZero) return null;

  return (
    <Badge
      count={count}
      maxCount={maxCount}
      variant="error"
      size={size}
      shape="pill"
      style={style}
    />
  );
};

const createStyles = (theme: Theme) => ({
  base: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    minWidth: 20,
    paddingHorizontal: theme.spacing[2],
  },

  // Tailles
  sizes: {
    xs: {
      height: 16,
      minWidth: 16,
      paddingHorizontal: theme.spacing[1],
    },
    sm: {
      height: 20,
      minWidth: 20,
      paddingHorizontal: theme.spacing[1.5],
    },
    base: {
      height: 24,
      minWidth: 24,
      paddingHorizontal: theme.spacing[2],
    },
    lg: {
      height: 28,
      minWidth: 28,
      paddingHorizontal: theme.spacing[2.5],
    },
  },

  // Formes
  shapes: {
    rounded: {
      borderRadius: theme.borderRadius.md,
    },
    pill: {
      borderRadius: theme.borderRadius.full,
    },
    square: {
      borderRadius: 0,
    },
  },

  // Variantes de couleur
  variants: {
    primary: {
      backgroundColor: theme.colors.primary[500],
    },
    secondary: {
      backgroundColor: theme.colors.secondary[500],
    },
    success: {
      backgroundColor: theme.colors.status.success,
    },
    warning: {
      backgroundColor: theme.colors.status.warning,
    },
    error: {
      backgroundColor: theme.colors.status.error,
    },
    info: {
      backgroundColor: theme.colors.status.info,
    },
    neutral: {
      backgroundColor: theme.colors.neutral[500],
    },
  },

  // Style outline
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },

  // Style dot
  dot: {
    width: 8,
    height: 8,
    minWidth: 8,
    paddingHorizontal: 0,
    borderRadius: theme.borderRadius.full,
  },

  // Texte
  text: {
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.inverse,
  },

  textSizes: {
    xs: {
      fontSize: 10,
      lineHeight: 12,
    },
    sm: {
      fontSize: 11,
      lineHeight: 14,
    },
    base: {
      fontSize: theme.typography.fontSize.xs,
      lineHeight: theme.typography.lineHeight.xs,
    },
    lg: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
    },
  },

  textVariants: {
    primary: {
      color: theme.colors.text.inverse,
    },
    secondary: {
      color: theme.colors.text.inverse,
    },
    success: {
      color: theme.colors.text.inverse,
    },
    warning: {
      color: theme.colors.text.inverse,
    },
    error: {
      color: theme.colors.text.inverse,
    },
    info: {
      color: theme.colors.text.inverse,
    },
    neutral: {
      color: theme.colors.text.inverse,
    },
  },

  textOutline: {
    color: theme.colors.text.primary,
  },

  // Positionnement
  positioned: {
    position: "absolute" as const,
    zIndex: 1,
  },

  positions: {
    "top-right": {
      top: -8,
      right: -8,
    },
    "top-left": {
      top: -8,
      left: -8,
    },
    "bottom-right": {
      bottom: -8,
      right: -8,
    },
    "bottom-left": {
      bottom: -8,
      left: -8,
    },
  },
});
