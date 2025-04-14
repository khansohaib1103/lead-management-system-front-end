import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"


document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root")

  if (container) {
    const root = createRoot(container)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    console.error("Root element not found. Make sure there is a div with id 'root' in your HTML.")
  }
})
