import { useState, useEffect } from 'react'

function App() {
  const [apiStatus, setApiStatus] = useState('Loading...')
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
    // Get API URL from environment variable or use same origin
    const apiUrl = import.meta.env.VITE_API_URL || ''
    
    fetch(`${apiUrl}/api/test`)
      .then(response => response.json())
      .then(data => {
        setApiStatus('Connected')
        setApiData(data)
      })
      .catch(error => {
        setApiStatus('Error')
        console.error('API Error:', error)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8">
            🚀 Full Stack Portfolio
          </h1>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-6">
              React + Express + Render
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-white text-lg">API Status:</span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  apiStatus === 'Connected' 
                    ? 'bg-green-500 text-white' 
                    : apiStatus === 'Error'
                    ? 'bg-red-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}>
                  {apiStatus}
                </span>
              </div>
              
              {apiData && (
                <div className="bg-white/20 rounded-lg p-4 mt-4">
                  <h3 className="text-white font-semibold mb-2">API Response:</h3>
                  <pre className="text-white text-sm text-left">
                    {JSON.stringify(apiData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Frontend</h3>
                <p className="text-white/80 text-sm">React + Vite + Tailwind</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Backend</h3>
                <p className="text-white/80 text-sm">Express + Node.js</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Deployment</h3>
                <p className="text-white/80 text-sm">Render.com</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-white/60">
            <p>Built with ❤️ for unified deployment</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
