"use client"

import "./LeadTable.css"

function LeadTable({ leads, onDelete }) {
  if (leads.length === 0) {
    return <div className="no-leads">No leads found. Add your first lead!</div>
  }

  return (
    <div className="table-container">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Company</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.fullName}</td>
              <td>{lead.email}</td>
              <td>{lead.phoneNumber || "-"}</td>
              <td>{lead.companyName || "-"}</td>
              <td className="notes-cell" title={lead.notes}>
                {lead.notes || "-"}
              </td>
              <td className="actions-cell">
                <button className="trash-icon" onClick={() => onDelete(lead.id, lead.fullName)} title="Delete lead">
                  <span className="trash-lines"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadTable
