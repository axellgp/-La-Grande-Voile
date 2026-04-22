import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Helper functions for common operations
export const authOperations = {
  // Sign up
  signUp: async (email, password, metadata = {}) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
  },

  // Sign in
  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  },

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut()
  },

  // Get current session
  getSession: async () => {
    return await supabase.auth.getSession()
  },

  // Get current user
  getUser: async () => {
    return await supabase.auth.getUser()
  },

  // Update user profile
  updateUser: async (data) => {
    return await supabase.auth.updateUser(data)
  },

  // Password reset
  resetPassword: async (email) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
  },
}

// Database operations helpers
export const dbOperations = {
  // Generic fetch
  fetch: async (table, options = {}) => {
    let query = supabase.from(table).select('*')
    
    if (options.filters) {
      options.filters.forEach(filter => {
        query = query.eq(filter.column, filter.value)
      })
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending })
    }
    
    return await query
  },

  // Insert
  insert: async (table, data) => {
    return await supabase.from(table).insert(data)
  },

  // Update
  update: async (table, id, data) => {
    return await supabase.from(table).update(data).eq('id', id)
  },

  // Delete
  delete: async (table, id) => {
    return await supabase.from(table).delete().eq('id', id)
  },
}

export default supabase
