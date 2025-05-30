import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { useThemedStyles } from "../../context/ThemeContext";
import { Theme } from "../../design/theme";
import { Header } from "../ui/Header";

type LayoutVariant = "default" | "centered" | "fullscreen";
type LayoutPadding = "none" | "sm" | "base" | "lg";

interface BaseLayoutProps {
  children: React.ReactNode;
  variant?: LayoutVariant;
  padding?: LayoutPadding;
  backgroundColor?: string;
  style?: ViewStyle;
  safeAreaEdges?: Edge[];
}

interface ScrollableLayoutProps extends BaseLayoutProps {
  scrollable: true;
  refreshing?: boolean;
  onRefresh?: () => void;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  contentContainerStyle?: ViewStyle;
  keyboardShouldPersistTaps?: "always" | "never" | "handled";
}

interface NonScrollableLayoutProps extends BaseLayoutProps {
  scrollable?: false;
}

type LayoutProps = ScrollableLayoutProps | NonScrollableLayoutProps;

// Layout de base
export const Layout: React.FC<LayoutProps> = ({
  children,
  variant = "default",
  padding = "base",
  backgroundColor,
  style,
  safeAreaEdges = ["bottom"],
  ...props
}) => {
  const styles = useThemedStyles(createStyles);

  const containerStyle = [
    styles.container,
    styles.variants[variant],
    styles.paddings[padding],
    backgroundColor && { backgroundColor },
    style,
  ];

  const content = <View style={containerStyle}>{children}</View>;

  if ("scrollable" in props && props.scrollable) {
    const {
      scrollable,
      refreshing,
      onRefresh,
      showsVerticalScrollIndicator = false,
      showsHorizontalScrollIndicator = false,
      contentContainerStyle,
      keyboardShouldPersistTaps = "handled",
      ...restProps
    } = props;

    return (
      <SafeAreaView style={styles.safeArea} edges={safeAreaEdges}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              styles.variants[variant],
              styles.paddings[padding],
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            refreshControl={
              onRefresh ? (
                <RefreshControl
                  refreshing={refreshing || false}
                  onRefresh={onRefresh}
                  colors={[styles.refreshColor]}
                  tintColor={styles.refreshColor}
                />
              ) : undefined
            }
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={safeAreaEdges}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Layout avec header
export const LayoutWithHeader: React.FC<
  LayoutProps & {
    headerTitle?: string;
    headerSubtitle?: string;
    showBackButton?: boolean;
    showCartButton?: boolean;
    headerVariant?: "default" | "transparent" | "primary";
    onHeaderLeftPress?: () => void;
    onHeaderRightPress?: () => void;
    headerLeftIcon?: string;
    headerRightIcon?: string;
    headerLeftComponent?: React.ReactNode;
    headerRightComponent?: React.ReactNode;
  }
> = ({
  headerTitle,
  headerSubtitle,
  showBackButton = false,
  showCartButton = false,
  headerVariant = "default",
  onHeaderLeftPress,
  onHeaderRightPress,
  headerLeftIcon,
  headerRightIcon,
  headerLeftComponent,
  headerRightComponent,
  safeAreaEdges = [],
  ...layoutProps
}) => {
  return (
    <>
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        variant={headerVariant}
        showBackButton={showBackButton}
        showCartButton={showCartButton}
        onLeftPress={onHeaderLeftPress}
        onRightPress={onHeaderRightPress}
        leftIcon={headerLeftIcon as any}
        rightIcon={headerRightIcon as any}
        leftComponent={headerLeftComponent}
        rightComponent={headerRightComponent}
      />
      <Layout {...layoutProps} safeAreaEdges={safeAreaEdges} />
    </>
  );
};

// Layout centré pour les écrans d'authentification
export const CenteredLayout: React.FC<
  Omit<LayoutProps, "variant"> & {
    maxWidth?: number;
  }
> = ({ maxWidth = 400, style, ...props }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <Layout
      {...props}
      variant="centered"
      style={[styles.centeredContainer, { maxWidth }, style]}
    />
  );
};

// Layout en plein écran
export const FullscreenLayout: React.FC<
  Omit<LayoutProps, "variant" | "safeAreaEdges">
> = (props) => {
  return <Layout {...props} variant="fullscreen" safeAreaEdges={[]} />;
};

// Layout avec sections
export const SectionLayout: React.FC<{
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  footerStyle?: ViewStyle;
  scrollable?: boolean;
}> = ({
  header,
  children,
  footer,
  headerStyle,
  contentStyle,
  footerStyle,
  scrollable = false,
}) => {
  const styles = useThemedStyles(createStyles);

  return (
    <Layout scrollable={false} padding="none">
      {header && (
        <View style={[styles.sectionHeader, headerStyle]}>{header}</View>
      )}

      <View style={[styles.sectionContent, contentStyle]}>
        {scrollable ? (
          <Layout scrollable padding="base">
            {children}
          </Layout>
        ) : (
          children
        )}
      </View>

      {footer && (
        <View style={[styles.sectionFooter, footerStyle]}>{footer}</View>
      )}
    </Layout>
  );
};

const createStyles = (theme: Theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },

  keyboardAvoid: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  // Variantes
  variants: {
    default: {
      // Style par défaut
    },
    centered: {
      justifyContent: "center" as const,
      alignItems: "center" as const,
    },
    fullscreen: {
      backgroundColor: theme.colors.background.primary,
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
  },

  // Layout centré
  centeredContainer: {
    width: "100%",
    alignSelf: "center" as const,
  },

  // Sections
  sectionHeader: {
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  sectionContent: {
    flex: 1,
  },

  sectionFooter: {
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    padding: theme.spacing[4],
  },

  // Couleur de refresh
  refreshColor: theme.colors.primary[500],
});
