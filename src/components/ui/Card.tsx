import React from "react";
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";

type CardVariant = "default" | "elevated" | "outlined" | "filled";
type CardPadding = "none" | "sm" | "base" | "lg" | "xl";

interface BaseCardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TouchableCardProps
  extends BaseCardProps,
    Omit<TouchableOpacityProps, "style"> {
  touchable: true;
}

interface NonTouchableCardProps extends BaseCardProps {
  touchable?: false;
}

type CardProps = TouchableCardProps | NonTouchableCardProps;

export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "base",
  children,
  style,
  ...props
}) => {
  const styles = useThemedStyles(createStyles);

  const cardStyle = [
    styles.base,
    styles.variants[variant],
    styles.paddings[padding],
    style,
  ];

  if ("touchable" in props && props.touchable) {
    const { touchable, ...touchableProps } = props;
    return (
      <TouchableOpacity
        style={cardStyle}
        activeOpacity={0.7}
        {...touchableProps}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

// Composants spécialisés pour différentes parties de la carte
export const CardHeader: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => {
  const styles = useThemedStyles(createStyles);
  return <View style={[styles.header, style]}>{children}</View>;
};

export const CardBody: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => {
  const styles = useThemedStyles(createStyles);
  return <View style={[styles.body, style]}>{children}</View>;
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => {
  const styles = useThemedStyles(createStyles);
  return <View style={[styles.footer, style]}>{children}</View>;
};

// Composant Card avec image
export const ImageCard: React.FC<{
  imageUri: string;
  imageHeight?: number;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}> = ({ imageUri, imageHeight = 200, children, onPress, style }) => {
  const styles = useThemedStyles(createStyles);

  const CardComponent = onPress ? TouchableOpacity : View;
  const cardProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <CardComponent
      style={[styles.base, styles.variants.default, style]}
      {...cardProps}
    >
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.paddings.base}>{children}</View>
    </CardComponent>
  );
};

const createStyles = (theme: Theme) => ({
  base: {
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.card,
    overflow: "hidden" as const,
  },

  // Variantes
  variants: {
    default: {
      ...theme.shadows.sm,
    },
    elevated: {
      ...theme.shadows.lg,
    },
    outlined: {
      borderWidth: 1,
      borderColor: theme.colors.border.light,
      ...theme.shadows.none,
    },
    filled: {
      backgroundColor: theme.colors.background.secondary,
      ...theme.shadows.none,
    },
  },

  // Padding
  paddings: {
    none: {
      padding: 0,
    },
    sm: {
      padding: theme.spacing[3],
    },
    base: {
      padding: theme.spacing[4],
    },
    lg: {
      padding: theme.spacing[6],
    },
    xl: {
      padding: theme.spacing[8],
    },
  },

  // Sections de la carte
  header: {
    paddingBottom: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    marginBottom: theme.spacing[3],
  },

  body: {
    flex: 1,
  },

  footer: {
    paddingTop: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    marginTop: theme.spacing[3],
  },

  // Image card
  imageContainer: {
    width: "100%",
    overflow: "hidden" as const,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
