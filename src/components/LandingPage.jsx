import { useState } from 'react'

function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

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
    </div>
  )
}

export default LandingPage

