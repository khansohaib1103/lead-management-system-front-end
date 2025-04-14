"use client"

import { useRef, useEffect } from "react"
import "./DeleteConfirmation.css"

function DeleteConfirmation({ onClose, onConfirm, leadName }) {
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
    <div className="confirm-overlay">
      <div className="confirm-content" ref={modalRef}>
        <div className="confirm-header">
          <h3>Confirm Deletion</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="confirm-body">
          <div className="confirm-icon">
            <span className="trash-lines"></span>
          </div>
          <p>
            Are you sure you want to delete <strong>{leadName}</strong>?
            <br />
            <span className="confirm-warning">This action cannot be undone.</span>
          </p>
        </div>
        <div className="confirm-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
