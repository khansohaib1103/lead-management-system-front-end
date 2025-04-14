"use client"

import { useRef, useEffect } from "react"
import LeadForm from "./LeadForm"
import "./LeadModal.css"

function LeadModal({ onClose, onSubmit }) {
  const modalRef = useRef()

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    function handleEscKey(event) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2>Add New Lead</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <LeadForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default LeadModal
