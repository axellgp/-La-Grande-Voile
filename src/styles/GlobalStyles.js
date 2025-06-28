import { createGlobalStyle } from 'styled-components'

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
    background-color: ${props => props.theme.colors.neutral.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    transition: all ${props => props.theme.transitions.fast};
  }

  input, textarea, select {
    font-family: inherit;
    border: 1px solid ${props => props.theme.colors.neutral[300]};
    border-radius: ${props => props.theme.radii.md};
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    transition: border-color ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary.main};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}1a;
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
