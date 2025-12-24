import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

// Add visible test to verify script is running
document.body.style.backgroundColor = '#030308'
document.body.style.color = '#ffffff'
document.body.style.margin = '0'
document.body.style.padding = '20px'
document.body.style.fontFamily = 'monospace'

console.log('main.jsx loaded')

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="padding: 20px; color: red; background: white;">Error: Root element not found!</div>'
} else {
  console.log('Root element found, mounting React...')
  
  // Show a temporary message
  rootElement.innerHTML = '<div style="color: #06b6d4;">Loading React app...</div>'
  
  try {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('React app mounted successfully!')
  } catch (error) {
    console.error('Error mounting React app:', error)
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: monospace; background: white;">
        <h1>Error Loading App</h1>
        <pre>${error.toString()}</pre>
        <pre>${error.stack}</pre>
      </div>
    `
  }
}

