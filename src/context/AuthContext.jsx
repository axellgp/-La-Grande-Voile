import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, authOperations, dbOperations } from '../lib/supabase'

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
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await authOperations.getSession()
        setSession(session)
        
        if (session?.user) {
          // Fetch user profile from database
          const { data: userProfile } = await fetchUserProfile(session.user.id)
          setUser(userProfile || { 
            id: session.user.id,
            email: session.user.email,
            role: 'client',
            firstName: session.user.user_metadata?.firstName || '',
            lastName: session.user.user_metadata?.lastName || '',
            loyaltyPoints: 0,
          })
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        
        if (session?.user) {
          const { data: userProfile } = await fetchUserProfile(session.user.id)
          setUser(userProfile || { 
            id: session.user.id,
            email: session.user.email,
            role: 'client',
            firstName: session.user.user_metadata?.firstName || '',
            lastName: session.user.user_metadata?.lastName || '',
            loyaltyPoints: 0,
          })
        } else {
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await dbOperations.fetch('profiles', {
        filters: [{ column: 'id', value: userId }]
      })
      
      if (error) throw error
      return data?.[0] || null
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  const login = async (email, password) => {
    try {
      const { data, error } = await authOperations.signIn(email, password)
      
      if (error) {
        throw new Error(error.message)
      }

      // Fetch complete user profile with role and loyalty points
      const { data: userProfile } = await fetchUserProfile(data.user.id)
      
      const completeUser = userProfile || {
        id: data.user.id,
        email: data.user.email,
        role: 'client',
        firstName: data.user.user_metadata?.firstName || '',
        lastName: data.user.user_metadata?.lastName || '',
        loyaltyPoints: 0,
      }

      setUser(completeUser)
      return { success: true, user: completeUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const { data, error } = await authOperations.signUp(
        userData.email,
        userData.password,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
        }
      )
      
      if (error) {
        throw new Error(error.message)
      }

      // Create user profile in database
      const profileData = {
        id: data.user.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'client',
        loyaltyPoints: 0,
        phone: userData.phone || '',
      }

      const { error: insertError } = await dbOperations.insert('profiles', profileData)
      
      if (insertError) {
        console.error('Error creating profile:', insertError)
      }

      const newUser = {
        id: data.user.id,
        ...profileData,
      }

      setUser(newUser)
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    await authOperations.signOut()
    setUser(null)
    setSession(null)
  }

  const updateProfile = async (updatedData) => {
    try {
      if (!user) throw new Error('No user logged in')

      // Update auth metadata if email or password changed
      if (updatedData.email || updatedData.password) {
        const authUpdateData = {}
        if (updatedData.email) authUpdateData.email = updatedData.email
        if (updatedData.password) authUpdateData.password = updatedData.password
        
        await authOperations.updateUser(authUpdateData)
      }

      // Update profile in database
      const profileUpdates = { ...updatedData }
      delete profileUpdates.password // Don't store password in profile
      
      const { error } = await dbOperations.update('profiles', user.id, profileUpdates)
      
      if (error) throw error

      const updatedUser = { ...user, ...profileUpdates }
      setUser(updatedUser)
      return { success: true, user: updatedUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const addLoyaltyPoints = async (points) => {
    if (!user) return
    
    try {
      const newPoints = (user.loyaltyPoints || 0) + points
      const { error } = await dbOperations.update('profiles', user.id, { 
        loyaltyPoints: newPoints 
      })
      
      if (error) throw error

      const updatedUser = { ...user, loyaltyPoints: newPoints }
      setUser(updatedUser)
    } catch (error) {
      console.error('Error adding loyalty points:', error)
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
