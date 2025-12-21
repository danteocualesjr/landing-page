import { useState, useEffect } from 'react'

function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Calculate launch date (14 days from today)
  const getLaunchDate = () => {
    const today = new Date()
    const launchDate = new Date(today)
    launchDate.setDate(today.getDate() + 14)
    launchDate.setHours(0, 0, 0, 0)
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

    updateTimer()
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
      await new Promise(resolve => setTimeout(resolve, 600))
      console.log('Email submitted:', email)
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
      {/* Animated background */}
      <div className="bg-gradient" style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`
      }} />
      <div className="bg-grid" />
      <div className="bg-noise" />
      
      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">GTM AI</span>
        </div>
        <div className="nav-badge">
          <span className="pulse" />
          <span>500 spots left</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-content">
          <div className="label-row">
            <span className="label">AI-Powered</span>
            <span className="label-divider">×</span>
            <span className="label">Content Creation</span>
          </div>

          <h1 className="headline">
            <span className="headline-line">Create months of</span>
            <span className="headline-line headline-gradient">content in minutes</span>
          </h1>

          <p className="subtext">
            The future of content marketing is here. Join <strong>5,000+ marketers</strong> already 
            on the waitlist for early access to the most powerful AI content engine ever built.
          </p>

          {/* Countdown */}
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-label">Days</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">Min</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">Sec</span>
            </div>
          </div>

          {/* Email Form */}
          {!submitted ? (
            <form className="email-form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  type="email"
                  className="email-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loader" />
                  ) : (
                    <>
                      <span>Get Early Access</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
              <p className="form-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="success-state">
              <div className="success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h3>You're on the list!</h3>
              <p>We'll reach out soon with exclusive early access details.</p>
            </div>
          )}

          {/* Social Proof */}
          <div className="social-proof">
            <div className="avatars">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="avatar" style={{ '--i': i }}>
                  {['A', 'M', 'S', 'K', 'R'][i]}
                </div>
              ))}
            </div>
            <div className="proof-text">
              <div className="proof-stats">
                <span className="stat-number">5,247</span> people joined this week
              </div>
              <div className="proof-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span>4.9/5 from beta testers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h4>Lightning Fast</h4>
            <p>Generate a month of content in under 5 minutes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h4>Save 40+ Hours</h4>
            <p>Every week on content creation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10M18 20V4M6 20v-4"/>
              </svg>
            </div>
            <h4>3x Engagement</h4>
            <p>Average increase in social metrics</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="footer-copy">© 2025 GTM AI. Building the future of content.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
