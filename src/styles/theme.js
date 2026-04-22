export const theme = {
  // Colors inspired by Banyuls-sur-Mer Marine & Mediterranean landscape
  colors: {
    ocean: {
      deep: '#0a1628',      // Abyssal depths
      navy: '#1e3a5f',      // Deep sea navy
      mediterranean: '#1e5f74',   // Mediterranean teal
      lagoon: '#2d9b9b',          // Lagoon turquoise
      aqua: '#4ecdc4',            // Aqua marine
      foam: '#a8e6cf',            // Sea foam
    },
    primary: {
      main: '#1e5f74', // Mediterranean teal
      light: '#2d9b9b',
      dark: '#1e3a5f',
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    secondary: {
      main: '#4ecdc4', // Aqua marine
      light: '#7eddd6',
      dark: '#2ab7a9',
    },
    accent: {
      gold: '#d4af37', // Mediterranean gold
      coral: '#ff6b6b', // Living coral
      sunset: '#ff8c42', // Sunset orange
      sand: '#f4e4c1', // Beach sand
      pearl: '#f8f6f4', // Pearl white
    },
    neutral: {
      white: '#ffffff',
      cream: '#fef7ed',
      beige: '#f5f5dc',
      sand: '#f4e4c1',
      shell: '#fff9f0',
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#0a1628',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#4ecdc4',
  },
  
  // Gradients
  gradients: {
    ocean: 'linear-gradient(135deg, #0a1628 0%, #1e5f74 50%, #2d9b9b 100%)',
    sunset: 'linear-gradient(135deg, #ff6b6b 0%, #ff8c42 50%, #d4af37 100%)',
    lagoon: 'linear-gradient(135deg, #2d9b9b 0%, #4ecdc4 100%)',
    deep: 'linear-gradient(180deg, #0a1628 0%, #1e3a5f 100%)',
  },
  
  // Typography
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
    accent: "'Cormorant Garamond', serif",
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },
  
  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Shadows with ocean feel
  shadows: {
    sm: '0 1px 2px 0 rgba(10, 22, 40, 0.05)',
    base: '0 1px 3px 0 rgba(10, 22, 40, 0.1), 0 1px 2px 0 rgba(10, 22, 40, 0.06)',
    md: '0 4px 6px -1px rgba(10, 22, 40, 0.1), 0 2px 4px -1px rgba(10, 22, 40, 0.06)',
    lg: '0 10px 15px -3px rgba(10, 22, 40, 0.1), 0 4px 6px -2px rgba(10, 22, 40, 0.05)',
    xl: '0 20px 25px -5px rgba(10, 22, 40, 0.15), 0 10px 10px -5px rgba(10, 22, 40, 0.04)',
    '2xl': '0 25px 50px -12px rgba(10, 22, 40, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(10, 22, 40, 0.06)',
    glow: '0 0 30px rgba(78, 205, 196, 0.3)',
    underwater: '0 20px 40px rgba(30, 95, 116, 0.4)',
    deepPulse: '0 0 40px rgba(78, 205, 196, 0.6), 0 0 60px rgba(45, 155, 155, 0.4)',
  },
  
  // Border radius
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
    full: '9999px',
  },
  
  // Transitions with marine easing
  transitions: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.7s cubic-bezier(0.4, 0, 0.2, 1)',
    wave: '0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    float: '3s ease-in-out infinite',
  },
  
  // Z-index scale
  zIndices: {
    hide: -1,
    auto: 'auto',
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
  },
}
