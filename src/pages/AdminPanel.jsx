import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import "../CSS/AdminPanel.css"

function AdminPanel() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingUserId, setEditingUserId] = useState(null)
  const [editingName, setEditingName] = useState("")
  const [editingRolee, setEditingRolee] = useState("")

  const API_URL = import.meta.env.VITE_API_URL
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/auth/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Could not load users")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?")
    if (!confirmed) return

    try {
      await axios.delete(`${API_URL}/auth/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.filter(u => u._id !== userId))
    } catch (err) {
      console.error("Error deleting user:", err)
      setError("Could not delete the user")
    }
  }

  const handleEditUser = (userId, name, role) => {
    setEditingUserId(userId)
    setEditingName(name)
    setEditingRolee(role)
  }

  const handleSaveUser = async (userId) => {
    try {
      const response = await axios.put(
        `${API_URL}/auth/admin/users/${userId}`,
        { name: editingName, role: editingRolee },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setUsers(users.map(u => u._id === userId ? response.data : u))
      setEditingUserId(null)
    } catch (err) {
      console.error("Error updating user:", err)
      setError("Could not update the user")
    }
  }

  if (loading) {
    return (
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <p>Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <p className="error">{error}</p>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p className="subtitle">Gestiona los usuarios registrados en Arkadia</p>
      </header>

      <div className="users-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="user-row">
                <td>
                  {editingUserId === u._id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td>{u.email}</td>
                <td>
                  {editingUserId === u._id ? (
                    <select
                      value={editingRolee}
                      onChange={(e) => setEditingRolee(e.target.value)}
                      className="edit-input"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`role-badge role-${u.role}`}>
                      {u.role === "admin" ? "Admin" : "Usuario"}
                    </span>
                  )}
                </td>
                <td className="actions">
                  {editingUserId === u._id ? (
                    <>
                      <button
                        onClick={() => handleSaveUser(u._id)}
                        className="btn-save"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditUser(u._id, u.name, u.role)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="users-summary">
        <p>Total users: <strong>{users.length}</strong></p>
        <p>Administrators: <strong>{users.filter(u => u.role === "admin").length}</strong></p>
      </div>
    </div>
  )
}

export default AdminPanel
