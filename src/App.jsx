"use client"

import { useState, useEffect } from "react"
import LeadTable from "./components/LeadTable"
import LeadModal from "./components/LeadModal"
import DeleteConfirmation from "./components/DeleteConfirmation"
import { fetchLeads, addLead, deleteLead } from "./api"
import "./App.css"

function App() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(null)

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchLeads()
      setLeads(data)
    } catch (err) {
      setError("Failed to fetch leads. Please try again later.")
      console.error("Error loading leads:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddLead = async (newLead) => {
    try {
      const addedLead = await addLead(newLead)
      setLeads(prevLeads => [...prevLeads, addedLead])
      setIsModalOpen(false)
    } catch (err) {
      setError("Failed to add lead. Please try again later.")
      console.error("Error adding lead:", err)
    }
  }

  const confirmDelete = (id, name) => {
    setDeleteConfirmation({ id, name })
  }

  const handleDeleteLead = async (id) => {
    try {
      await deleteLead(id)
      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id))
      setDeleteConfirmation(null)
    } catch (err) {
      setError("Failed to delete lead. Please try again later.")
      console.error("Error deleting lead:", err)
      setDeleteConfirmation(null)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lead Management System</h1>
        <button className="add-lead-btn" onClick={() => setIsModalOpen(true)}>
          Add New Lead
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading leads...</div>
      ) : (
        <LeadTable leads={leads} onDelete={confirmDelete} />
      )}

      {isModalOpen && <LeadModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddLead} />}

      {deleteConfirmation && (
        <DeleteConfirmation
          leadName={deleteConfirmation.name}
          onClose={() => setDeleteConfirmation(null)}
          onConfirm={() => handleDeleteLead(deleteConfirmation.id)}
        />
      )}
    </div>
  )
}

export default App
