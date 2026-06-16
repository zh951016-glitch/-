import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const rootElement = document.getElementById('root')

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  rootElement.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#08090b;color:#f0f0ed;font-family:Arial,sans-serif">
      <div>
        <h1 style="font-size:24px">页面加载失败</h1>
        <p style="color:#92949a">请刷新页面，或重新运行启动网站.cmd。</p>
      </div>
    </main>
  `
  console.error(error)
}
