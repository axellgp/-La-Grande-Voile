import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock user data - in a real app, this would come from an API
  const mockUsers = [
    {
      id: 1,
      email: 'admin@lagrandevoile.com',
      password: 'admin123',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'Hotel',
      loyaltyPoints: 0,
    },
    {
      id: 2,
      email: 'client@example.com',
      password: 'client123',
      role: 'client',
      firstName: 'Jean',
      lastName: 'Dupont',
      loyaltyPoints: 450,
      bookingHistory: [],
    }
  ]

  useEffect(() => {
    // Check if user is logged in (in real app, check token validity)
    const savedUser = localStorage.getItem('lagrandevoile_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Mock authentication - in real app, this would be an API call
      const foundUser = mockUsers.find(u => u.email === email && u.password === password)
      
      if (!foundUser) {
        throw new Error('Email ou mot de passe incorrect')
      }

      const userWithoutPassword = { ...foundUser }
      delete userWithoutPassword.password

      setUser(userWithoutPassword)
      localStorage.setItem('lagrandevoile_user', JSON.stringify(userWithoutPassword))
      
      return { success: true, user: userWithoutPassword }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      // Mock registration - in real app, this would be an API call
      const existingUser = mockUsers.find(u => u.email === userData.email)
      
      if (existingUser) {
        throw new Error('Un compte avec cet email existe déjà')
      }

      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: 'client',
        loyaltyPoints: 0,
        bookingHistory: [],
      }

      delete newUser.password
      mockUsers.push({ ...newUser, password: userData.password })

      setUser(newUser)
      localStorage.setItem('lagrandevoile_user', JSON.stringify(newUser))
      
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('lagrandevoile_user')
  }

  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData }
      setUser(updatedUser)
      localStorage.setItem('lagrandevoile_user', JSON.stringify(updatedUser))
      return { success: true, user: updatedUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const addLoyaltyPoints = (points) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        loyaltyPoints: (user.loyaltyPoints || 0) + points 
      }
      setUser(updatedUser)
      localStorage.setItem('lagrandevoile_user', JSON.stringify(updatedUser))
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    addLoyaltyPoints,
    isAdmin: user?.role === 'admin',
    isLoggedIn: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
