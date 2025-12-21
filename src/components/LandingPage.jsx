import { useState, useEffect } from 'react'

function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Calculate launch date (14 days from today)
  const getLaunchDate = () => {
    const today = new Date()
    const launchDate = new Date(today)
    launchDate.setDate(today.getDate() + 14)
    launchDate.setHours(0, 0, 0, 0) // Set to midnight
    return launchDate
  }

  useEffect(() => {
    const launchDate = getLaunchDate()

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Update immediately
    updateTimer()

    // Update every second
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      alert('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      // Mock API call - placeholder for future backend integration
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // Log email for testing (replace with actual API call later)
      console.log('Email submitted:', email)
      
      // TODO: Replace with actual API endpoint
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting email:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="badge">Only 500 Beta Spots Left</div>
          
          <h1 className="headline">Revolutionary AI Content Tool</h1>
          
          <p className="subtext">
            Create months of content in minutes. Join 5,000+ marketers on the waitlist.
          </p>
          
          <div className="launch-date">Launching Q2 2026</div>

          {!submitted ? (
            <form className="email-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="email-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Joining...' : 'Join the Waitlist'}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <div className="checkmark-icon">✓</div>
              <p>You're on the waitlist! We will contact you soon with more information.</p>
            </div>
          )}
        </div>
      </div>

      <div className="countdown-section">
        <div className="countdown-content">
          <p className="countdown-label">Early access closes in:</p>
          <div className="countdown-timer">
            <div className="time-box">
              <div className="time-value">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="time-label">Days</div>
            </div>
            <div className="time-box">
              <div className="time-value">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="time-label">Hours</div>
            </div>
            <div className="time-box">
              <div className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="time-label">Minutes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="social-proof-section">
        <div className="social-proof-content">
          <div className="trust-indicators">
            <div className="trust-item">
              <div className="trust-icon">✓</div>
              <span>No credit card required</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon">✓</div>
              <span>Join free</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon">✓</div>
              <span>5,000+ marketers waiting</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 GTM AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

