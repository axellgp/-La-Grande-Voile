import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

// Keyframe animations pour effets marins
const rise = keyframes`
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
`

const sway = keyframes`
  0%, 100% {
    transform: rotate(-5deg) translateX(0);
  }
  25% {
    transform: rotate(5deg) translateX(10px);
  }
  75% {
    transform: rotate(-5deg) translateX(-10px);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
`

const drift = keyframes`
  0% {
    transform: translateX(-100vw);
  }
  100% {
    transform: translateX(100vw);
  }
`

const causticMove = keyframes`
  0%, 100% {
    background-position: 0 0;
  }
  25% {
    background-position: 100px 50px;
  }
  50% {
    background-position: 50px 100px;
  }
  75% {
    background-position: -50px 50px;
  }
`

// Containers
const MarineContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: ${props => props.$zIndex || 0};
  overflow: hidden;
`

// Bubble Component
const Bubble = styled(motion.div)`
  position: absolute;
  bottom: -50px;
  width: ${props => props.$size || 20}px;
  height: ${props => props.$size || 20}px;
  background: radial-gradient(
    ellipse at 30% 30%,
    rgba(255, 255, 255, 0.8),
    rgba(78, 205, 196, 0.4) 50%,
    rgba(30, 95, 116, 0.2) 100%
  );
  border-radius: 50%;
  box-shadow: 
    inset 0 0 10px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(78, 205, 196, 0.3);
  animation: ${rise} ${props => props.$duration || 4}s ease-in infinite;
  animation-delay: ${props => props.$delay || 0}s;
  left: ${props => props.$left || 50}%;
`

// Seaweed Component
const Seaweed = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: ${props => props.$width || 20}px;
  height: ${props => props.$height || 150}px;
  background: linear-gradient(
    to top,
    rgba(45, 155, 155, 0.8),
    rgba(78, 205, 196, 0.4)
  );
  border-radius: 50% 50% 0 0;
  transform-origin: bottom center;
  animation: ${sway} ${props => props.$duration || 3}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  left: ${props => props.$left || 50}%;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$width || 20}px;
    height: 30px;
    background: linear-gradient(
      to top,
      rgba(78, 205, 196, 0.6),
      transparent
    );
    border-radius: 50%;
    filter: blur(5px);
  }
`

// Light Ray Component
const LightRay = styled(motion.div)`
  position: absolute;
  top: -100px;
  width: ${props => props.$width || 100}px;
  height: ${props => props.$height || 400}px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(78, 205, 196, 0.05),
    transparent
  );
  transform: rotate(${props => props.$rotation || 0}deg);
  transform-origin: top center;
  filter: blur(20px);
  animation: ${pulse} ${props => props.$duration || 5}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  left: ${props => props.$left || 50}%;
`

// Particle Component (plancton/sand)
const Particle = styled(motion.div)`
  position: absolute;
  width: ${props => props.$size || 4}px;
  height: ${props => props.$size || 4}px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8),
    rgba(244, 228, 193, 0.4)
  );
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation: ${drift} ${props => props.$duration || 20}s linear infinite;
  top: ${props => props.$top || 50}%;
`

// Caustic Overlay (light refraction underwater)
const CausticOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: ${causticMove} 20s ease-in-out infinite;
  pointer-events: none;
  mix-blend-mode: overlay;
`

// Wave SVG Component
const WaveSVG = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  
  path {
    fill: ${props => props.$color || 'rgba(78, 205, 196, 0.3)'};
    animation: ${sway} 4s ease-in-out infinite;
  }
`

// Main Marine Background Component
export const MarineBackground = ({ 
  children, 
  variant = 'ocean', 
  bubbleCount = 15,
  seaweedCount = 8,
  lightRaysCount = 5,
  particleCount = 30,
  showCaustics = true,
  zIndex = 0
}) => {
  const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 3,
    delay: Math.random() * 3,
  }))

  const seaweeds = Array.from({ length: seaweedCount }, (_, i) => ({
    id: i,
    height: Math.random() * 100 + 100,
    width: Math.random() * 15 + 10,
    left: Math.random() * 100,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 2,
  }))

  const lightRays = Array.from({ length: lightRaysCount }, (_, i) => ({
    id: i,
    width: Math.random() * 150 + 50,
    height: Math.random() * 300 + 200,
    left: Math.random() * 100,
    rotation: Math.random() * 30 - 15,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 2,
  }))

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <MarineContainer $zIndex={zIndex}>
      {/* Caustic light effect */}
      {showCaustics && <CausticOverlay />}
      
      {/* Light rays from surface */}
      {lightRays.map(ray => (
        <LightRay
          key={`ray-${ray.id}`}
          $width={ray.width}
          $height={ray.height}
          $left={ray.left}
          $rotation={ray.rotation}
          $duration={ray.duration}
          $delay={ray.delay}
        />
      ))}
      
      {/* Rising bubbles */}
      {bubbles.map(bubble => (
        <Bubble
          key={`bubble-${bubble.id}`}
          $size={bubble.size}
          $left={bubble.left}
          $duration={bubble.duration}
          $delay={bubble.delay}
        />
      ))}
      
      {/* Floating particles */}
      {particles.map(particle => (
        <Particle
          key={`particle-${particle.id}`}
          $size={particle.size}
          $top={particle.top}
          $duration={particle.duration}
          $delay={particle.delay}
        />
      ))}
      
      {/* Swaying seaweed at bottom */}
      {seaweeds.map(seaweed => (
        <Seaweed
          key={`seaweed-${seaweed.id}`}
          $height={seaweed.height}
          $width={seaweed.width}
          $left={seaweed.left}
          $duration={seaweed.duration}
          $delay={seaweed.delay}
        />
      ))}
      
      {/* Content */}
      {children}
    </MarineContainer>
  )
}

// Simple Wave Divider Component
export const WaveDivider = ({ color = 'rgba(78, 205, 196, 0.3)', height = 100 }) => (
  <WaveSVG 
    viewBox="0 0 1200 120" 
    preserveAspectRatio="none"
    $color={color}
    style={{ height: `${height}px` }}
  >
    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"/>
    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"/>
    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"/>
  </WaveSVG>
)

// Fish School Animation
const Fish = styled(motion.div)`
  position: absolute;
  width: ${props => props.$size || 30}px;
  height: ${props => props.$size || 15}px;
  background: linear-gradient(
    90deg,
    rgba(255, 107, 107, 0.8),
    rgba(255, 140, 66, 0.4)
  );
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 10px solid rgba(255, 107, 107, 0.8);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
`

export const FishSchool = ({ count = 5, speed = 20 }) => {
  const fish = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 20,
    top: Math.random() * 60 + 20,
    duration: Math.random() * 10 + speed,
    delay: Math.random() * 5,
  }))

  return (
    <>
      {fish.map(f => (
        <Fish
          key={`fish-${f.id}`}
          $size={f.size}
          initial={{ x: '-100vw', y: `${f.top}%` }}
          animate={{ x: '100vw' }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: 'linear',
          }}
        />
      ))}
    </>
  )
}

export default MarineBackground
