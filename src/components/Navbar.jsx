import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, LogOut, Menu, Settings, User, Waves, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Shell = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  padding: ${({ theme }) => `${theme.spacing[4]} 0`};
  pointer-events: none;
`

const Bar = styled.nav`
  width: min(1280px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 253, 249, 0.88)'};
  box-shadow: ${({ theme }) => theme.shadows.base};
  backdrop-filter: blur(18px);
  pointer-events: auto;
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 0;
`

const Mark = styled.span`
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.gradients.button};
  color: ${({ theme }) => theme.colors.neutral.white};
  box-shadow: ${({ theme }) => theme.shadows.glow};
`

const BrandText = styled.span`
  display: flex;
  flex-direction: column;

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(1.5rem, 2vw, 2rem);
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  small {
    color: ${({ theme }) => theme.colors.neutral[500]};
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    small {
      display: none;
    }
  }
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgba(18, 58, 99, 0.04);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const NavLink = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.dark : theme.colors.neutral[600]};
  background: ${({ $active }) => ($active ? 'rgba(18, 58, 99, 0.08)' : 'transparent')};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
    background: rgba(18, 58, 99, 0.06);
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-left: auto;
`

const UserButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  min-height: 3rem;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  color: ${({ theme }) => theme.colors.primary.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const UserMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  min-width: 14rem;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.98);
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

const UserMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.neutral[700]};

  &:hover {
    background: rgba(18, 58, 99, 0.06);
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`

const UserMenuAction = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.neutral[700]};
  text-align: left;

  &:hover {
    background: rgba(18, 58, 99, 0.06);
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`

const MobileButton = styled.button`
  display: none;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  color: ${({ theme }) => theme.colors.primary.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: inline-flex;
  }
`

const MobilePanel = styled(motion.div)`
  width: min(1280px, calc(100% - 2rem));
  margin: ${({ theme }) => `${theme.spacing[3]} auto 0`};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.98);
  box-shadow: ${({ theme }) => theme.shadows.lg};
  pointer-events: auto;

  @media (min-width: calc(${({ theme }) => theme.breakpoints.lg} + 1px)) {
    display: none;
  }
`

const MobileList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`

const MobileLink = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ $active }) => ($active ? 'rgba(18, 58, 99, 0.08)' : 'rgba(18, 58, 99, 0.03)')};
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

const navigation = [
  { path: '/', label: 'Accueil' },
  { path: '/rooms', label: 'Appartements' },
  { path: '/reservation', label: 'Reservation' },
  { path: '/calendrier', label: 'Disponibilites' },
  { path: '/a-propos', label: 'La residence' },
  { path: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const location = useLocation()
  const { user, isLoggedIn, isAdmin, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserOpen(false)
  }, [location.pathname])

  const userLabel = [user?.firstName, user?.lastName].filter(Boolean).join(' ')

  return (
    <Shell>
      <Bar $scrolled={scrolled}>
        <Brand to="/">
          <Mark>
            <Waves size={18} />
          </Mark>
          <BrandText>
            <strong>La Grande Voile</strong>
            <small>Residence de luxe a Banyuls-sur-Mer</small>
          </BrandText>
        </Brand>

        <Nav>
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} $active={location.pathname === item.path}>
              {item.label}
            </NavLink>
          ))}
        </Nav>

        <Actions>
          {isLoggedIn ? (
            <div style={{ position: 'relative' }}>
              <UserButton onClick={() => setUserOpen((open) => !open)}>
                <User size={16} />
                {userLabel || 'Mon compte'}
              </UserButton>
              <AnimatePresence>
                {userOpen && (
                  <UserMenu
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <UserMenuLink to="/profile">
                      <User size={16} />
                      Mon profil
                    </UserMenuLink>
                    <UserMenuLink to="/reservations">
                      <Calendar size={16} />
                      Mes reservations
                    </UserMenuLink>
                    {isAdmin && (
                      <UserMenuLink to="/admin">
                        <Settings size={16} />
                        Menu admin
                      </UserMenuLink>
                    )}
                    <UserMenuAction onClick={logout}>
                      <LogOut size={16} />
                      Deconnexion
                    </UserMenuAction>
                  </UserMenu>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Connexion
              </Link>
              <Link to="/reservation" className="btn btn-primary">
                Reserver
              </Link>
            </>
          )}

          <MobileButton onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </MobileButton>
        </Actions>
      </Bar>

      <AnimatePresence>
        {mobileOpen && (
          <MobilePanel
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <MobileList>
              {navigation.map((item) => (
                <MobileLink key={item.path} to={item.path} $active={location.pathname === item.path}>
                  {item.label}
                </MobileLink>
              ))}
              {!isLoggedIn && (
                <>
                  <Link to="/login" className="btn btn-secondary">
                    Connexion
                  </Link>
                  <Link to="/reservation" className="btn btn-primary">
                    Reserver
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <MobileLink to="/profile" $active={location.pathname === '/profile'}>
                    Mon profil
                  </MobileLink>
                  <MobileLink to="/reservations" $active={location.pathname === '/reservations'}>
                    Mes reservations
                  </MobileLink>
                  {isAdmin && (
                    <MobileLink to="/admin" $active={location.pathname === '/admin'}>
                      Menu admin
                    </MobileLink>
                  )}
                  <button className="btn btn-secondary" onClick={logout}>
                    <LogOut size={16} />
                    Deconnexion
                  </button>
                </>
              )}
            </MobileList>
          </MobilePanel>
        )}
      </AnimatePresence>
    </Shell>
  )
}

export default Navbar
