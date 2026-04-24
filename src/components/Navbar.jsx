import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Compass, LogOut, Menu, Settings, User, Waves, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NavbarShell = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  padding: ${({ theme }) => `${theme.spacing[4]} 0`};
  pointer-events: none;
`

const NavbarFrame = styled.nav`
  width: min(1320px, calc(100% - 1.25rem));
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  pointer-events: auto;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme, $scrolled }) =>
    $scrolled ? 'rgba(180, 224, 241, 0.18)' : 'rgba(180, 224, 241, 0.12)'};
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(7, 25, 39, 0.88)' : 'rgba(7, 25, 39, 0.66)'};
  box-shadow: ${({ theme }) => theme.shadows.base};
  backdrop-filter: blur(26px);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(100%, calc(100% - 0.75rem));
    padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[3]}`};
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 0;
`

const BrandMark = styled.span`
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.neutral.white};
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 45%),
    ${({ theme }) => theme.colors.gradients.button};
  box-shadow: ${({ theme }) => theme.shadows.glow};
`

const BrandText = styled.span`
  display: flex;
  flex-direction: column;
  min-width: 0;

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(1.45rem, 2vw, 2rem);
    line-height: 1;
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  small {
    color: ${({ theme }) => theme.colors.neutral[300]};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: 0.62rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    small {
      display: none;
    }
  }
`

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const NavPill = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid rgba(180, 224, 241, 0.14);
  background: rgba(255, 255, 255, 0.04);
`

const NavItem = styled(Link)`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.neutral.white : theme.colors.neutral[300]};
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral.white};
    background: rgba(255, 255, 255, 0.06);
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-left: auto;
`

const InfoTag = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid rgba(180, 224, 241, 0.12);
  color: ${({ theme }) => theme.colors.neutral[300]};
  background: rgba(255, 255, 255, 0.04);
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;

  svg {
    color: ${({ theme }) => theme.colors.secondary.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: none;
  }
`

const UserBlock = styled.div`
  position: relative;
`

const UserButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  min-height: 3rem;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid rgba(180, 224, 241, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.colors.neutral.white};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const Dropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  width: 15rem;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(8, 29, 44, 0.94);
  box-shadow: ${({ theme }) => theme.shadows.lg};
  backdrop-filter: blur(24px);
`

const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.neutral[200]};

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: ${({ theme }) => theme.colors.neutral.white};
  }
`

const DropdownAction = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.neutral[200]};
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: ${({ theme }) => theme.colors.neutral.white};
  }
`

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileToggle = styled.button`
  display: none;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(180, 224, 241, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.colors.neutral.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: inline-flex;
  }
`

const MobilePanel = styled(motion.div)`
  pointer-events: auto;
  width: min(1320px, calc(100% - 1.25rem));
  margin: ${({ theme }) => `${theme.spacing[3]} auto 0`};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(7, 25, 39, 0.94);
  box-shadow: ${({ theme }) => theme.shadows.lg};
  backdrop-filter: blur(26px);

  @media (min-width: calc(${({ theme }) => theme.breakpoints.lg} + 1px)) {
    display: none;
  }
`

const MobileList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`

const MobileNavItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.neutral.white : theme.colors.neutral[300]};
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(135, 237, 246, 0.16)' : 'transparent'};
`

const MobileActions = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`

const navigation = [
  { path: '/', label: 'Accueil' },
  { path: '/rooms', label: 'Appartements' },
  { path: '/reservation', label: 'Reservation' },
  { path: '/calendrier', label: 'Disponibilites' },
  { path: '/a-propos', label: 'Residence' },
  { path: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const location = useLocation()
  const { user, isLoggedIn, isAdmin, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const userLabel = useMemo(() => {
    if (!user) return ''
    return [user.firstName, user.lastName].filter(Boolean).join(' ')
  }, [user])

  return (
    <NavbarShell>
      <NavbarFrame $scrolled={scrolled}>
        <Brand to="/">
          <BrandMark>
            <Waves size={18} />
          </BrandMark>
          <BrandText>
            <strong>La Grande Voile</strong>
            <small>Residence face a la baie de Banyuls</small>
          </BrandText>
        </Brand>

        <DesktopNav>
          <NavPill>
            {navigation.map((item) => (
              <NavItem key={item.path} to={item.path} $active={location.pathname === item.path}>
                {item.label}
              </NavItem>
            ))}
          </NavPill>
        </DesktopNav>

        <Actions>
          <InfoTag>
            <Compass size={14} />
            Mer, plongee, terrasses et vue panoramique
          </InfoTag>

          {isLoggedIn ? (
            <UserBlock>
              <UserButton onClick={() => setUserMenuOpen((open) => !open)}>
                <User size={16} />
                {userLabel || 'Mon compte'}
              </UserButton>

              <AnimatePresence>
                {userMenuOpen && (
                  <Dropdown
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.22 }}
                  >
                    <DropdownLink to="/profile">
                      <User size={16} />
                      Mon profil
                    </DropdownLink>
                    <DropdownLink to="/reservations">
                      <Calendar size={16} />
                      Mes reservations
                    </DropdownLink>
                    {isAdmin && (
                      <DropdownLink to="/admin">
                        <Settings size={16} />
                        Administration
                      </DropdownLink>
                    )}
                    <DropdownAction onClick={logout}>
                      <LogOut size={16} />
                      Deconnexion
                    </DropdownAction>
                  </Dropdown>
                )}
              </AnimatePresence>
            </UserBlock>
          ) : (
            <AuthLinks>
              <Link to="/login" className="btn btn-secondary">
                Connexion
              </Link>
              <Link to="/reservation" className="btn btn-primary">
                Reserver
              </Link>
            </AuthLinks>
          )}

          <MobileToggle onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </MobileToggle>
        </Actions>
      </NavbarFrame>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobilePanel
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            <MobileList>
              {navigation.map((item) => (
                <MobileNavItem
                  key={item.path}
                  to={item.path}
                  $active={location.pathname === item.path}
                >
                  <span>{item.label}</span>
                  <span>→</span>
                </MobileNavItem>
              ))}
            </MobileList>

            <MobileActions>
              {isLoggedIn ? (
                <>
                  <MobileNavItem to="/profile" $active={location.pathname === '/profile'}>
                    <span>Mon profil</span>
                    <User size={16} />
                  </MobileNavItem>
                  <MobileNavItem to="/reservations" $active={location.pathname === '/reservations'}>
                    <span>Mes reservations</span>
                    <Calendar size={16} />
                  </MobileNavItem>
                  {isAdmin && (
                    <MobileNavItem to="/admin" $active={location.pathname === '/admin'}>
                      <span>Administration</span>
                      <Settings size={16} />
                    </MobileNavItem>
                  )}
                  <button className="btn btn-secondary" onClick={logout}>
                    <LogOut size={16} />
                    Deconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary">
                    Connexion
                  </Link>
                  <Link to="/reservation" className="btn btn-primary">
                    Reserver maintenant
                  </Link>
                </>
              )}
            </MobileActions>
          </MobilePanel>
        )}
      </AnimatePresence>
    </NavbarShell>
  )
}

export default Navbar
