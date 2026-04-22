import { createGlobalStyle, keyframes } from 'styled-components'

// Marine & Ocean Keyframe Animations
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`

const wave = keyframes`
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const bubble = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100px) scale(1.5);
    opacity: 0;
  }
`

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`

const deepPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(78, 205, 196, 0.6), 0 0 60px rgba(45, 155, 155, 0.4);
  }
`

const waterFlow = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 50px;
  }
`

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    line-height: 1.6;
    color: ${props => props.theme.colors.neutral[800]};
    background: linear-gradient(180deg, ${props => props.theme.colors.neutral.shell} 0%, ${props => props.theme.colors.ocean.foam} 100%);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fontWeights.semibold};
    line-height: 1.2;
    color: ${props => props.theme.colors.neutral[900]};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: ${props => props.theme.fontWeights.semibold};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: ${props => props.theme.fontWeights.semibold};
  }

  h4 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: ${props => props.theme.fontWeights.medium};
  }

  h5 {
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: ${props => props.theme.fontWeights.medium};
  }

  h6 {
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: ${props => props.theme.fontWeights.medium};
  }

  p {
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.7;
    color: ${props => props.theme.colors.neutral[700]};
  }

  a {
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.primary.light};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    transition: all ${props => props.theme.transitions.normal};
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  input, textarea, select {
    font-family: inherit;
    border: 1px solid ${props => props.theme.colors.neutral[300]};
    border-radius: ${props => props.theme.radii.lg};
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[5]};
    transition: all ${props => props.theme.transitions.normal};
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary.main};
      box-shadow: 0 0 0 4px ${props => props.theme.colors.primary.light}20,
                  0 0 20px ${props => props.theme.colors.ocean.aqua}30;
      background: rgba(255, 255, 255, 1);
    }

    @media (max-width: 768px) {
      padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
      font-size: 16px; /* Prevent zoom on iOS */
    }
  }

  /* Glass morphism utility class */
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: ${props => props.theme.shadows.underwater};
    border-radius: ${props => props.theme.radii['2xl']};
  }

  .glass-card-light {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: ${props => props.theme.shadows.glow};
  }

  /* Gradient text utilities */
  .gradient-text-ocean {
    background: ${props => props.theme.gradients.ocean};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-text-sunset {
    background: ${props => props.theme.gradients.sunset};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Animation utility classes */
  .float-animation {
    animation: ${float} 4s ease-in-out infinite;
  }

  .wave-animation {
    animation: ${wave} 3s ease-in-out infinite;
  }

  .shimmer-animation {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 3s infinite;
  }

  .bubble-animation {
    animation: ${bubble} 2s ease-out forwards;
  }

  .deep-pulse-animation {
    animation: ${deepPulse} 3s ease-in-out infinite;
  }

  /* Water ripple effect container */
  .ripple-container {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    &:hover::after {
      width: 300px;
      height: 300px;
    }
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    body {
      overflow-x: hidden;
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.neutral[400]};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.neutral[500]};
  }

  /* Loading animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  /* Utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing[4]};
  }

  .container-wide {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing[4]};
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  /* Responsive design */
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    h1 {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
    
    h2 {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
    
    h3 {
      font-size: ${props => props.theme.fontSizes['2xl']};
    }
    
    .container {
      padding: 0 ${props => props.theme.spacing[4]};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    h1 {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
    
    h2 {
      font-size: ${props => props.theme.fontSizes['2xl']};
    }
    
    .container {
      padding: 0 ${props => props.theme.spacing[3]};
    }
  }
`

export default GlobalStyles
