import React, { createContext, useState, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { db } from '../services/database';

// Tipo para o contexto
interface ThemeContextProps {
    themeMode: 'light' | 'dark';
    toggleTheme: () => void;
}

// Criar o contexto
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

    // Função para alternar entre os temas
    const toggleTheme = async () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);

        // Salvar a preferência no banco de dados
        await db.settings.put({ id: 1, theme: newTheme });
    };

    // Recuperar a preferência do banco de dados
    useEffect(() => {
        const loadTheme = async () => {
            const settings = await db.settings.get(1);
            setThemeMode(settings?.theme || 'light');
        };
        loadTheme();
    }, []);

    // Definir o tema do Material-UI
    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    });

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

// Hook para acessar o contexto
export const useThemeContext = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext deve ser usado dentro de ThemeContextProvider');
    }
    return context;
};
