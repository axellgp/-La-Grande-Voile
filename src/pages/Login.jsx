import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  padding: ${props => props.theme.spacing[4]};
`

const LoginContainer = styled(motion.div)`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.radii['2xl']};
  box-shadow: ${props => props.theme.shadows['2xl']};
  overflow: hidden;
  width: 100%;
  max-width: 400px;
`

const LoginHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.coral});
  color: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
  text-align: center;

  h1 {
    color: ${props => props.theme.colors.neutral.white};
    margin-bottom: ${props => props.theme.spacing[2]};
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    opacity: 0.9;
  }
`

const LoginForm = styled.form`
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
`

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
  position: relative;

  label {
    display: block;
    margin-bottom: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.neutral[700]};
    font-weight: ${props => props.theme.fontWeights.medium};
  }

  .input-container {
    position: relative;

    svg {
      position: absolute;
      left: ${props => props.theme.spacing[3]};
      top: 50%;
      transform: translateY(-50%);
      color: ${props => props.theme.colors.neutral[400]};
    }

    input {
      width: 100%;
      padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[3]} ${props => props.theme.spacing[3]} ${props => props.theme.spacing[12]};
      border: 1px solid ${props => props.theme.colors.neutral[300]};
      border-radius: ${props => props.theme.radii.lg};
      font-size: ${props => props.theme.fontSizes.base};
      transition: border-color ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary.main};
        box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}1a;
      }

      &.error {
        border-color: ${props => props.theme.colors.error};
      }
    }

    .toggle-password {
      position: absolute;
      right: ${props => props.theme.spacing[3]};
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: ${props => props.theme.colors.neutral[400]};
      cursor: pointer;
      padding: ${props => props.theme.spacing[1]};

      &:hover {
        color: ${props => props.theme.colors.neutral[600]};
      }
    }
  }

  .error-message {
    color: ${props => props.theme.colors.error};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-top: ${props => props.theme.spacing[1]};
  }
`

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.primary.light});
  color: ${props => props.theme.colors.neutral.white};
  border: none;
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[6]};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

const LoginLinks = styled.div`
  text-align: center;
  
  p {
    color: ${props => props.theme.colors.neutral[600]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }

  a {
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
    font-weight: ${props => props.theme.fontWeights.medium};

    &:hover {
      text-decoration: underline;
    }
  }
`

const DemoCredentials = styled.div`
  background: ${props => props.theme.colors.neutral[50]};
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[6]};

  h4 {
    color: ${props => props.theme.colors.neutral[800]};
    margin-bottom: ${props => props.theme.spacing[3]};
    font-size: ${props => props.theme.fontSizes.sm};
  }

  .demo-account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${props => props.theme.spacing[2]};
    font-size: ${props => props.theme.fontSizes.sm};

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      color: ${props => props.theme.colors.neutral[600]};
    }

    .credentials {
      color: ${props => props.theme.colors.neutral[800]};
      font-family: monospace;
      background: ${props => props.theme.colors.neutral.white};
      padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
      border-radius: ${props => props.theme.radii.sm};
      border: 1px solid ${props => props.theme.colors.neutral[200]};
    }
  }
`

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      const result = await login(data.email, data.password)
      
      if (result.success) {
        toast.success('Connexion réussie !')
        navigate('/')
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (email, password) => {
    setValue('email', email)
    setValue('password', password)
  }

  return (
    <LoginPage>
      <LoginContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LoginHeader>
          <h1>Connexion</h1>
          <p>Accédez à votre espace personnel</p>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <DemoCredentials>
            <h4>Comptes de démonstration :</h4>
            <div className="demo-account">
              <span className="label">Admin :</span>
              <button
                type="button"
                className="credentials"
                onClick={() => fillDemoCredentials('admin@lagrandevoile.com', 'admin123')}
                style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}
              >
                admin@lagrandevoile.com / admin123
              </button>
            </div>
            <div className="demo-account">
              <span className="label">Client :</span>
              <button
                type="button"
                className="credentials"
                onClick={() => fillDemoCredentials('client@example.com', 'client123')}
                style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}
              >
                client@example.com / client123
              </button>
            </div>
          </DemoCredentials>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <Mail size={20} />
              <input
                type="email"
                id="email"
                className={errors.email ? 'error' : ''}
                {...register('email', {
                  required: 'L\'email est obligatoire',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Format d\'email invalide',
                  },
                })}
                placeholder="votre@email.com"
              />
            </div>
            {errors.email && (
              <div className="error-message">{errors.email.message}</div>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Mot de passe</label>
            <div className="input-container">
              <Lock size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={errors.password ? 'error' : ''}
                {...register('password', {
                  required: 'Le mot de passe est obligatoire',
                  minLength: {
                    value: 6,
                    message: 'Le mot de passe doit contenir au moins 6 caractères',
                  },
                })}
                placeholder="Votre mot de passe"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password.message}</div>
            )}
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
            <ArrowRight size={20} />
          </SubmitButton>

          <LoginLinks>
            <p>
              Pas encore de compte ?{' '}
              <Link to="/inscription">Créer un compte</Link>
            </p>
            <p>
              <Link to="/">Retour à l'accueil</Link>
            </p>
          </LoginLinks>
        </LoginForm>
      </LoginContainer>
    </LoginPage>
  )
}

export default Login
