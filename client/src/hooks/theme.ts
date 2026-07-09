import * as React from 'react';
import { useLayoutEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = React.useState(
        localStorage.getItem('app-theme') || 'light'
    );

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return { theme, setTheme };
};
