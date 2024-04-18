import React from 'react'
import ColorSearch from './components/common/ColorSearch'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

const App = () => {
  return (
    <div className="flex flex-col h-screen">
    <Header />
    <main className="flex-grow">
      <ColorSearch />
    </main>
    <Footer />
  </div>
  )
}

export default App
