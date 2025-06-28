import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.lightBlue} 0%, ${props => props.theme.colors.cream} 100%);
  padding: 2rem;
`

const FormCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 1rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  position: relative;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  z-index: 2;
  color: ${props => props.theme.colors.darkGray};
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.darkGray};
  z-index: 2;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  background: #fee;
  color: #d63384;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`

const SuccessMessage = styled.div`
  background: #d1e7dd;
  color: #0f5132;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 600;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`

const AuthLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme.colors.darkGray};

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Le nom est requis')
      return false
    }

    if (!formData.email.trim()) {
      setError('L\'email est requis')
      return false
    }

    if (!formData.email.includes('@')) {
      setError('Email invalide')
      return false
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setError('')

    try {
      // Simulation d'inscription - en réalité ça irait vers une API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = {
        name: formData.name,
        email: formData.email,
        role: 'client',
        createdAt: new Date().toISOString().split('T')[0]
      }

      register(userData)
      setSuccess('Compte créé avec succès ! Redirection...')
      
      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (error) {
      setError('Erreur lors de la création du compte. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BackLink to="/">
          <ArrowLeft size={20} />
          Retour à l'accueil
        </BackLink>

        <Header>
          <Title>Créer un compte</Title>
          <Subtitle>Rejoignez La Grande Voile à Banyuls-sur-Mer</Subtitle>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nom complet</Label>
            <InputWrapper>
              <InputIcon>
                <User size={20} />
              </InputIcon>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Adresse email</Label>
            <InputWrapper>
              <InputIcon>
                <Mail size={20} />
              </InputIcon>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <InputWrapper>
              <InputIcon>
                <Lock size={20} />
              </InputIcon>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <InputWrapper>
              <InputIcon>
                <Lock size={20} />
              </InputIcon>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus size={20} />
            {isLoading ? 'Création en cours...' : 'Créer mon compte'}
          </SubmitButton>
        </Form>

        <AuthLink>
          Vous avez déjà un compte ?{' '}
          <Link to="/login">Se connecter</Link>
        </AuthLink>
      </FormCard>
    </Container>
  )
}

export default Register
