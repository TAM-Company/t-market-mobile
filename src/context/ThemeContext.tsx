import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { Theme, darkTheme, lightTheme } from "../design/theme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@t-market/theme-mode";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Déterminer le thème actuel basé sur le mode et le système
  const getEffectiveTheme = (): Theme => {
    if (themeMode === "system") {
      return systemColorScheme === "dark" ? darkTheme : lightTheme;
    }
    return themeMode === "dark" ? darkTheme : lightTheme;
  };

  const theme = getEffectiveTheme();
  const isDark = theme.isDark;

  // Charger le thème sauvegardé au démarrage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du thème:", error);
      }
    };

    loadTheme();
  }, []);

  // Écouter les changements du thème système
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  // Sauvegarder le thème quand il change
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du thème:", error);
      // Continuer même en cas d'erreur de sauvegarde
      setThemeModeState(mode);
    }
  };

  const value: ThemeContextType = {
    theme,
    themeMode,
    setThemeMode,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Hook pour utiliser le thème
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  }
  return context;
};

// Hook pour créer des styles avec le thème
export const useThemedStyles = <T extends Record<string, any>>(
  createStyles: (theme: Theme) => T
): T => {
  const { theme } = useTheme();
  return React.useMemo(() => createStyles(theme), [theme, createStyles]);
};
