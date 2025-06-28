import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`

const swim = keyframes`
  0% { transform: translateX(-50px); }
  100% { transform: translateX(50px); }
`

const tentacle = keyframes`
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
`

const MarineContainer = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  z-index: ${props => props.zIndex || 1};
  opacity: ${props => props.opacity || 0.7};
`

const FloatingElement = styled.div`
  animation: ${float} ${props => props.$duration || 3}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  color: ${props => props.$color || props.theme.colors.secondary};
  font-size: ${props => props.$size || '2rem'};
`

const SwimmingElement = styled.div`
  animation: ${swim} ${props => props.$duration || 8}s linear infinite;
  animation-delay: ${props => props.$delay || 0}s;
  color: ${props => props.$color || props.theme.colors.primary};
  font-size: ${props => props.$size || '1.5rem'};
`

const TentacleElement = styled.div`
  animation: ${tentacle} ${props => props.$duration || 2}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  color: ${props => props.$color || '#8B4E6B'};
  font-size: ${props => props.$size || '2.5rem'};
  transform-origin: bottom center;
`

const MarineIcon = ({ type, style, ...props }) => {
  const icons = {
    fish: '🐟',
    octopus: '🐙',
    merou: '🐠',
    seahorse: '🦑',
    shell: '🐚',
    starfish: '⭐',
    coral: '🪸',
    wave: '🌊',
    anchor: '⚓',
    diving: '🤿',
    jellyfish: '🪼'
  }

  return <span style={style} {...props}>{icons[type] || icons.fish}</span>
}

export const MarineFloat = ({ type, position, duration, delay, size, color, zIndex }) => (
  <MarineContainer
    style={position}
    zIndex={zIndex}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.7, scale: 1 }}
    transition={{ duration: 1, delay: delay * 0.5 }}
  >
    <FloatingElement $duration={duration} $delay={delay} $size={size}>
      <MarineIcon type={type} style={{ color }} />
    </FloatingElement>
  </MarineContainer>
)

export const MarineSwim = ({ type, position, duration, delay, size, color, zIndex }) => (
  <MarineContainer
    style={position}
    zIndex={zIndex}
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 0.6, x: 0 }}
    transition={{ duration: 1.5, delay: delay * 0.3 }}
  >
    <SwimmingElement $duration={duration} $delay={delay} $size={size}>
      <MarineIcon type={type} style={{ color }} />
    </SwimmingElement>
  </MarineContainer>
)

export const MarineTentacle = ({ type, position, duration, delay, size, color, zIndex }) => (
  <MarineContainer
    style={position}
    zIndex={zIndex}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.8, scale: 1 }}
    transition={{ duration: 1.2, delay: delay * 0.4 }}
  >
    <TentacleElement $duration={duration} $delay={delay} $size={size}>
      <MarineIcon type={type} style={{ color }} />
    </TentacleElement>
  </MarineContainer>
)

export const MarineElements = ({ density = 'normal', showBackground = true, divingTheme = false }) => {
  const getDensityConfig = () => {
    if (divingTheme) {
      // Pour les pages de plongée : plus d'emojis marins spécifiques
      switch (density) {
        case 'light':
          return { count: 6, types: ['merou', 'octopus', 'jellyfish', 'diving'] }
        case 'normal':
          return { count: 10, types: ['merou', 'octopus', 'jellyfish', 'diving', 'coral', 'seahorse', 'starfish'] }
        case 'heavy':
          return { count: 15, types: ['merou', 'octopus', 'jellyfish', 'diving', 'coral', 'seahorse', 'starfish', 'shell'] }
        default:
          return { count: 10, types: ['merou', 'octopus', 'jellyfish', 'diving', 'coral', 'seahorse', 'starfish'] }
      }
    } else {
      // Pour les autres pages : plus discret avec des éléments simples
      switch (density) {
        case 'light':
          return { count: 3, types: ['wave', 'anchor'] }
        case 'normal':
          return { count: 5, types: ['wave', 'anchor', 'shell'] }
        case 'heavy':
          return { count: 8, types: ['wave', 'anchor', 'shell', 'starfish'] }
        default:
          return { count: 5, types: ['wave', 'anchor', 'shell'] }
      }
    }
  }

  const config = getDensityConfig()
  const elements = []

  for (let i = 0; i < config.count; i++) {
    const type = config.types[Math.floor(Math.random() * config.types.length)]
    const componentType = Math.random()
    
    let Component
    if (componentType < 0.4) {
      Component = MarineFloat
    } else if (componentType < 0.8) {
      Component = MarineSwim
    } else {
      Component = MarineTentacle
    }

    elements.push(
      <Component
        key={i}
        type={type}
        position={{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`
        }}
        duration={Math.random() * 4 + 3}
        delay={Math.random() * 3}
        size={`${Math.random() * 1.5 + 1}rem`}
        zIndex={Math.floor(Math.random() * 3) + 1}
      />
    )
  }

  return (
    <>
      {elements}
    </>
  )
}

export const MarineBackground = ({ children, density = 'normal' }) => {
  const getDensityConfig = () => {
    switch (density) {
      case 'light':
        return { count: 3, types: ['fish', 'wave'] }
      case 'normal':
        return { count: 6, types: ['fish', 'octopus', 'wave', 'shell'] }
      case 'heavy':
        return { count: 10, types: ['fish', 'octopus', 'merou', 'wave', 'shell', 'starfish', 'coral'] }
      default:
        return { count: 6, types: ['fish', 'octopus', 'wave', 'shell'] }
    }
  }

  const config = getDensityConfig()
  const elements = []

  for (let i = 0; i < config.count; i++) {
    const type = config.types[Math.floor(Math.random() * config.types.length)]
    const isFloating = Math.random() > 0.5
    const Component = isFloating ? MarineFloat : MarineSwim

    elements.push(
      <Component
        key={i}
        type={type}
        position={{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`
        }}
        duration={Math.random() * 4 + 3}
        delay={Math.random() * 2}
        size={`${Math.random() * 1.5 + 1}rem`}
        zIndex={Math.floor(Math.random() * 3) + 1}
      />
    )
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {elements}
      {children}
    </div>
  )
}

export default MarineIcon
