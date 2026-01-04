/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '300' }],
                sm: ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '300' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '300' }],
                lg: ['1.125rem', { lineHeight: '1.75', letterSpacing: '0.01em', fontWeight: '300' }],
                xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '0.01em', fontWeight: '300' }],
                '2xl': ['1.5rem', { lineHeight: '2', letterSpacing: '0em', fontWeight: '400' }],
                '3xl': ['1.875rem', { lineHeight: '2.25', letterSpacing: '0em', fontWeight: '400' }],
                '4xl': ['2.25rem', { lineHeight: '2.5', letterSpacing: '0em', fontWeight: '400' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '400' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '400' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '400' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '400' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '400' }],
            },
            fontFamily: {
                heading: "cormorantgaramond",
                paragraph: "lato-light"
            },
            colors: {
                'light-grey': '#E5E7EB',
                destructive: '#DC2626',
                'destructive-foreground': '#FFFFFF',
                background: '#F1F5F9',
                secondary: '#22C55E',
                foreground: '#002147',
                'secondary-foreground': '#002147',
                'primary-foreground': '#F1F5F9',
                primary: '#002147'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
