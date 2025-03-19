import { useState } from 'react'
import Portfolio from './components/PortfolioDisplay'
import PortfolioEditors from './components/PortfolioEditor'
import './App.css'

function App() {
  return (
    <>
      <Portfolio/>
      <PortfolioEditors/>
    </>
  )
}

export default App
