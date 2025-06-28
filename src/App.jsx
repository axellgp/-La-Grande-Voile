import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Toaster } from 'react-hot-toast'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Booking from './pages/Booking'
import Reservations from './pages/Reservations'
import BookingCalendar from './pages/BookingCalendar'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'

// Context
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { LogsProvider } from './context/LogsContext'

// Theme
import { theme } from './styles/theme'

// Global styles
import GlobalStyles from './styles/GlobalStyles'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <BookingProvider>
          <LogsProvider>
          <Router
            basename="/-La-Grande-Voile"
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <ScrollToTop />
            <div className="App">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/rooms/:id" element={<RoomDetail />} />
                  <Route path="/reservation" element={<Booking />} />
                  <Route path="/booking/:id" element={<Booking />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/calendrier" element={<BookingCalendar />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/a-propos" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </Router>
          </LogsProvider>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
