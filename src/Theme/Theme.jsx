import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#8D40DB',
            contrastText: '#f1fffa',
            light: '#6ee4ea',
            dark: '#027379',
        },
        secondary: {
            main: 'rgba(220,10,84,0.94)',
            contrastText: '#f1fffa',
            dark: '#b70042',
            light: '#e23974',
        },
        divider: '#adbebf',
        error: {
            main: '#e84135',
            contrastText: '#f1fffa',
        },
        warning: {
            main: '#f1940a',
            contrastText: '#2c3531',
        },
        info: {
            main: '#2092ec',
            contrastText: '#f1fffa',
        },
        success: {
            main: '#50b554',
            contrastText: '#f1fffa',
        },
        text: {
            primary: '#464e47',
            secondary: '#798c7c',
            disabled: '#9a9a9a',
        },
        background: {
            default: '#F1FFFA',
        },
    },
    typography: {
        fontSize: 12,
    },
    shape: {
        borderRadius: 10,
    },
    spacing: 8,
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 550,
            // most basic recommended timing
            standard: 300,
            // this is to be used in complex animations
            complex: 375,
            // recommended when something is entering screen
            enteringScreen: 400,
            // recommended when something is leaving screen
            leavingScreen: 250,
        },
    },
})