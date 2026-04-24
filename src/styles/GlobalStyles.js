import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=JetBrains+Mono:wght@500&family=Manrope:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background: ${({ theme }) => theme.colors.surface.page};
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.neutral[100]};
    background: ${({ theme }) => theme.colors.gradients.aurora};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  body::before,
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
  }

  body::before {
    background:
      radial-gradient(circle at 10% 20%, rgba(88, 199, 212, 0.18), transparent 26%),
      radial-gradient(circle at 85% 15%, rgba(246, 197, 119, 0.12), transparent 18%),
      radial-gradient(circle at 50% 80%, rgba(44, 130, 177, 0.18), transparent 24%);
    animation: oceanGlow 18s ease-in-out infinite alternate;
  }

  body::after {
    background-image: linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 120px 120px;
    mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.55), transparent 75%);
    opacity: 0.25;
  }

  #root,
  .App {
    min-height: 100vh;
  }

  .App {
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 0.96;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  h1 {
    font-size: clamp(3.4rem, 9vw, ${({ theme }) => theme.fontSizes['7xl']});
  }

  h2 {
    font-size: clamp(2.4rem, 6vw, ${({ theme }) => theme.fontSizes['6xl']});
  }

  h3 {
    font-size: clamp(1.8rem, 3vw, ${({ theme }) => theme.fontSizes['4xl']});
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[200]};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  small,
  label,
  input,
  textarea,
  select,
  button {
    font-family: ${({ theme }) => theme.fonts.body};
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.secondary.light};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast},
      opacity ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.accent.gold};
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
    transition: transform ${({ theme }) => theme.transitions.fast},
      background ${({ theme }) => theme.transitions.fast},
      border-color ${({ theme }) => theme.transitions.fast},
      box-shadow ${({ theme }) => theme.transitions.fast};
  }

  input,
  textarea,
  select {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.surface.border};
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
    color: ${({ theme }) => theme.colors.neutral.white};
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(18px);
    transition: border-color ${({ theme }) => theme.transitions.fast},
      box-shadow ${({ theme }) => theme.transitions.fast},
      background ${({ theme }) => theme.transitions.fast};
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary.light};
    box-shadow: 0 0 0 4px rgba(103, 232, 249, 0.12);
    background: rgba(255, 255, 255, 0.08);
  }

  ::selection {
    background: rgba(103, 232, 249, 0.2);
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  .container,
  .container-wide {
    width: min(1240px, calc(100% - 2rem));
    margin: 0 auto;
  }

  .container-wide {
    width: min(1400px, calc(100% - 2rem));
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[2]};
    min-height: 3.5rem;
    padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
    border-radius: ${({ theme }) => theme.radii.full};
    border: 1px solid transparent;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    letter-spacing: 0.02em;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    backdrop-filter: blur(16px);
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .btn-primary {
    color: ${({ theme }) => theme.colors.neutral.white};
    background: ${({ theme }) => theme.colors.gradients.button};
    border-color: rgba(135, 237, 246, 0.16);
  }

  .btn-secondary {
    color: ${({ theme }) => theme.colors.neutral.white};
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ theme }) => theme.colors.surface.border};
  }

  .btn-outline {
    color: ${({ theme }) => theme.colors.secondary.light};
    background: transparent;
    border-color: rgba(88, 199, 212, 0.35);
    box-shadow: none;
  }

  .btn-accent {
    color: ${({ theme }) => theme.colors.neutral.ink};
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent.gold}, ${({ theme }) => theme.colors.accent.coral});
    border-color: transparent;
  }

  .glass-panel {
    background: ${({ theme }) => theme.colors.surface.card};
    border: 1px solid ${({ theme }) => theme.colors.surface.border};
    box-shadow: ${({ theme }) => theme.shadows.base};
    backdrop-filter: blur(20px);
  }

  .section-title {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
    border-radius: ${({ theme }) => theme.radii.full};
    background: rgba(223, 251, 255, 0.08);
    border: 1px solid rgba(135, 237, 246, 0.18);
    color: ${({ theme }) => theme.colors.secondary.light};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(4, 19, 31, 0.95);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(88, 199, 212, 0.9), rgba(11, 59, 89, 0.92));
    border: 3px solid rgba(4, 19, 31, 0.95);
    border-radius: 999px;
  }

  @keyframes oceanGlow {
    from {
      transform: scale(1) translate3d(0, 0, 0);
      opacity: 0.72;
    }
    to {
      transform: scale(1.08) translate3d(1.5%, 1%, 0);
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    html {
      font-size: 15px;
    }

    .container,
    .container-wide {
      width: min(100%, calc(100% - 1.25rem));
    }

    .btn {
      min-height: 3.25rem;
      width: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`

export default GlobalStyles
