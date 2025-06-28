import React, { createContext, useContext, useState, useEffect } from 'react'

const LogsContext = createContext()

export const useLogs = () => {
  const context = useContext(LogsContext)
  if (!context) {
    throw new Error('useLogs must be used within a LogsProvider')
  }
  return context
}

export const LogsProvider = ({ children }) => {
  const [logs, setLogs] = useState([])

  // Charger les logs depuis le localStorage au démarrage
  useEffect(() => {
    const savedLogs = localStorage.getItem('laGrandeVoile_logs')
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs))
      } catch (error) {
        console.error('Erreur lors du chargement des logs:', error)
        setLogs([])
      }
    } else {
      // Ajouter quelques logs de test au premier démarrage
      const testLogs = [
        {
          id: 1,
          timestamp: new Date().toISOString(),
          type: 'system',
          action: 'init',
          data: { message: 'Système initialisé' },
          userId: null,
          details: 'Initialisation du système de logs'
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 60000).toISOString(),
          type: 'booking',
          action: 'request',
          data: { roomName: 'Test', guestName: 'Client Test' },
          userId: 2,
          details: 'Nouvelle demande de réservation pour Test par Client Test'
        }
      ]
      setLogs(testLogs)
    }
  }, [])

  // Sauvegarder les logs dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('laGrandeVoile_logs', JSON.stringify(logs))
  }, [logs])

  const addLog = (type, action, data, userId = null) => {
    const newLog = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      type, // 'booking', 'user', 'admin', 'system'
      action, // 'create', 'update', 'delete', 'confirm', 'cancel', 'request'
      data,
      userId,
      details: generateLogDetails(type, action, data)
    }

    setLogs(prev => [newLog, ...prev])
    return newLog
  }

  const generateLogDetails = (type, action, data) => {
    switch (type) {
      case 'booking':
        switch (action) {
          case 'request':
            return `Demande de réservation créée pour ${data.guestName} - ${data.apartmentName} du ${formatDate(data.checkIn)} au ${formatDate(data.checkOut)}`
          case 'confirm':
            return `Réservation confirmée pour ${data.guestName} - ${data.apartmentName}`
          case 'cancel':
            return `Réservation annulée pour ${data.guestName} - ${data.apartmentName}`
          case 'update':
            return `Réservation modifiée pour ${data.guestName} - ${data.apartmentName}`
          case 'delete':
            return `Réservation supprimée pour ${data.guestName} - ${data.apartmentName}`
          default:
            return `Action ${action} sur la réservation ${data.id}`
        }
      case 'user':
        switch (action) {
          case 'login':
            return `Connexion de l'utilisateur ${data.email}`
          case 'register':
            return `Inscription du nouvel utilisateur ${data.email}`
          case 'logout':
            return `Déconnexion de l'utilisateur ${data.email}`
          default:
            return `Action utilisateur: ${action}`
        }
      case 'admin':
        return `Action admin: ${action} - ${data.description || ''}`
      case 'system':
        return `Système: ${action} - ${data.message || ''}`
      default:
        return `Log: ${type} - ${action}`
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const getLogsByType = (type) => {
    return logs.filter(log => log.type === type)
  }

  const getBookingLogs = () => {
    return logs.filter(log => log.type === 'booking')
  }

  const getRecentLogs = (limit = 10) => {
    return logs.slice(0, limit)
  }

  const clearLogs = () => {
    setLogs([])
  }

  const exportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `logs-la-grande-voile-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const value = {
    logs,
    addLog,
    getLogsByType,
    getBookingLogs,
    getRecentLogs,
    clearLogs,
    exportLogs
  }

  return (
    <LogsContext.Provider value={value}>
      {children}
    </LogsContext.Provider>
  )
}
