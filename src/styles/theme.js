const makeColorScale = (scale) => ({
  ...scale,
  toString() {
    return scale.main
  },
  valueOf() {
    return scale.main
  },
  [Symbol.toPrimitive]() {
    return scale.main
  },
})

const primary = makeColorScale({
  main: '#0b3b59',
  light: '#16719c',
  dark: '#062338',
  50: '#edf8ff',
  100: '#d5effc',
  200: '#addff6',
  300: '#7bc7ec',
  400: '#4aa9dd',
  500: '#2489c0',
  600: '#16719c',
  700: '#10597b',
  800: '#0b3b59',
  900: '#062338',
})

const secondary = makeColorScale({
  main: '#58c7d4',
  light: '#87edf6',
  dark: '#2aa0b0',
  50: '#effdff',
  100: '#d6f8fb',
  200: '#b0eef4',
  300: '#87edf6',
  400: '#58c7d4',
  500: '#3eb1c1',
  600: '#2aa0b0',
  700: '#1d7f8d',
  800: '#135864',
  900: '#0b3943',
})

export const theme = {
  colors: {
    primary,
    secondary,
    accent: {
      gold: '#f6c577',
      coral: '#ff8966',
      teal: '#63d3df',
      foam: '#dffbff',
      pearl: '#f7fbff',
    },
    neutral: {
      white: '#ffffff',
      50: '#f4fbff',
      100: '#e8f2f7',
      200: '#d3e0ea',
      300: '#b4c5d3',
      400: '#88a0b5',
      500: '#667f95',
      600: '#4d6478',
      700: '#34495b',
      800: '#1b3141',
      900: '#081b2b',
      sand: '#efe4d3',
      mist: '#dbe9f2',
      ink: '#091521',
    },
    surface: {
      page: '#061826',
      section: 'rgba(7, 25, 39, 0.78)',
      card: 'rgba(12, 41, 63, 0.72)',
      cardStrong: 'rgba(10, 31, 48, 0.88)',
      glass: 'rgba(255, 255, 255, 0.08)',
      glassStrong: 'rgba(255, 255, 255, 0.14)',
      overlay: 'rgba(2, 11, 19, 0.58)',
      border: 'rgba(180, 224, 241, 0.18)',
    },
    gradients: {
      hero: 'linear-gradient(135deg, rgba(4, 21, 33, 0.92) 0%, rgba(8, 47, 73, 0.82) 45%, rgba(14, 93, 124, 0.66) 100%)',
      aurora: 'radial-gradient(circle at top, rgba(88, 199, 212, 0.35), transparent 42%), radial-gradient(circle at 80% 20%, rgba(246, 197, 119, 0.18), transparent 24%), linear-gradient(180deg, #071a28 0%, #08263b 50%, #061522 100%)',
      card: 'linear-gradient(180deg, rgba(16, 59, 87, 0.9) 0%, rgba(8, 29, 44, 0.98) 100%)',
      line: 'linear-gradient(90deg, rgba(99, 211, 223, 0), rgba(99, 211, 223, 1), rgba(246, 197, 119, 0.75), rgba(99, 211, 223, 0))',
      cta: 'linear-gradient(135deg, #58c7d4 0%, #16719c 48%, #0b3b59 100%)',
      button: 'linear-gradient(135deg, #77e3ef 0%, #2ea7c4 42%, #166389 100%)',
      warm: 'linear-gradient(135deg, rgba(246, 197, 119, 0.24), rgba(255, 137, 102, 0.18))',
    },
    success: '#36d399',
    warning: '#fbbf24',
    error: '#fb7185',
    info: '#67e8f9',
    lightBlue: '#dff4ff',
    cream: '#f7fbff',
    darkGray: '#385164',
    lightGray: 'rgba(148, 163, 184, 0.28)',
  },

  fonts: {
    heading: "'Cormorant Garamond', serif",
    body: "'Manrope', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.4rem',
    '5xl': '3.25rem',
    '6xl': '4.5rem',
    '7xl': '5.75rem',
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

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
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
  },

  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  shadows: {
    sm: '0 10px 24px rgba(2, 12, 21, 0.12)',
    base: '0 18px 48px rgba(3, 16, 28, 0.22)',
    md: '0 22px 60px rgba(3, 16, 28, 0.28)',
    lg: '0 30px 80px rgba(3, 16, 28, 0.35)',
    xl: '0 42px 120px rgba(2, 10, 18, 0.45)',
    glow: '0 0 0 1px rgba(135, 237, 246, 0.18), 0 30px 70px rgba(15, 78, 115, 0.28)',
    inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
  },

  radii: {
    none: '0',
    sm: '0.375rem',
    base: '0.5rem',
    md: '0.875rem',
    lg: '1.25rem',
    xl: '1.75rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    full: '9999px',
  },

  transitions: {
    fast: '180ms cubic-bezier(0.2, 0.8, 0.2, 1)',
    normal: '320ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '650ms cubic-bezier(0.19, 1, 0.22, 1)',
  },

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
