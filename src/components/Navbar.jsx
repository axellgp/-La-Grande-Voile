import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Calendar, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndices.sticky};
  background: ${props => props.$scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.$scrolled ? props.theme.colors.neutral[200] : 'transparent'};
  transition: all ${props => props.theme.transitions.normal};
`

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary.main};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};

  &:hover {
    color: ${props => props.theme.colors.primary.light};
  }
`

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  border-radius: ${props => props.theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[8]};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`

const NavLink = styled(Link)`
  color: ${props => props.$active ? props.theme.colors.primary.main : props.theme.colors.neutral[700]};
  font-weight: ${props => props.$active ? props.theme.fontWeights.semibold : props.theme.fontWeights.medium};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
    transition: width ${props => props.theme.transitions.normal};
  }

  &:hover {
    color: ${props => props.theme.colors.primary.main};
    
    &::after {
      width: 100%;
    }
  }
`

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
`

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  background: ${props => props.theme.colors.neutral.white};
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.radii.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  color: ${props => props.theme.colors.neutral[700]};

  &:hover {
    background: ${props => props.theme.colors.neutral[50]};
    border-color: ${props => props.theme.colors.primary.main};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${props => props.theme.colors.neutral[700]};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.neutral.white};
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
  padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  box-shadow: ${props => props.theme.shadows.lg};
`

const MobileNavLink = styled(Link)`
  color: ${props => props.$active ? props.theme.colors.primary.main : props.theme.colors.neutral[700]};
  font-weight: ${props => props.$active ? props.theme.fontWeights.semibold : props.theme.fontWeights.medium};
  text-decoration: none;
  padding: ${props => props.theme.spacing[3]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[100]};
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }

  &:last-child {
    border-bottom: none;
  }
`

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.theme.colors.neutral.white};
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: ${props => props.theme.spacing[2]};
  min-width: 200px;
  z-index: ${props => props.theme.zIndices.dropdown};
`

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.neutral[700]};
  text-decoration: none;
  border-radius: ${props => props.theme.radii.md};
  transition: background ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.neutral[50]};
    color: ${props => props.theme.colors.primary.main};
  }
`

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.neutral[700]};
  background: none;
  border: none;
  border-radius: ${props => props.theme.radii.md};
  cursor: pointer;
  transition: background ${props => props.theme.transitions.fast};
  width: 100%;
  text-align: left;

  &:hover {
    background: ${props => props.theme.colors.neutral[50]};
    color: ${props => props.theme.colors.primary.main};
  }
`

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isLoggedIn, isAdmin, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/rooms', label: 'Appartements' },
    { path: '/reservation', label: 'Réserver' },
    { path: '/calendrier', label: 'Disponibilités' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <NavbarContainer $scrolled={scrolled}>
      <NavbarContent>
        <Logo to="/">
          <LogoIcon>LGV</LogoIcon>
          La Grande Voile
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $active={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <UserMenu>
          {isLoggedIn ? (
            <div style={{ position: 'relative' }}>
              <UserButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <User size={20} />
                {user.firstName}
              </UserButton>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <Dropdown
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownItem to="/profile">
                      <User size={16} />
                      Mon Profil
                    </DropdownItem>
                    <DropdownItem to="/reservations">
                      <Calendar size={16} />
                      Mes Réservations
                    </DropdownItem>
                    {isAdmin && (
                      <DropdownItem to="/admin">
                        <Settings size={16} />
                        Administration
                      </DropdownItem>
                    )}
                    <DropdownButton onClick={handleLogout}>
                      <LogOut size={16} />
                      Déconnexion
                    </DropdownButton>
                  </Dropdown>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="btn btn-outline">
                Connexion
              </Link>
              <Link to="/register" className="btn btn-primary">
                Inscription
              </Link>
            </div>
          )}

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </UserMenu>
      </NavbarContent>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                $active={location.pathname === item.path}
              >
                {item.label}
              </MobileNavLink>
            ))}
            
            {isLoggedIn ? (
              <>
                <MobileNavLink to="/profile">Mon Profil</MobileNavLink>
                <MobileNavLink to="/reservations">Mes Réservations</MobileNavLink>
                {isAdmin && <MobileNavLink to="/admin">Administration</MobileNavLink>}
                <button 
                  onClick={handleLogout}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    textAlign: 'left',
                    padding: '12px 0',
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login">Connexion</MobileNavLink>
                <MobileNavLink to="/register">Inscription</MobileNavLink>
              </>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  )
}

export default Navbar
