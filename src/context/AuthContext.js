import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const initialUser = {
  id: 'user-1',
  name: 'JUAN',
  phone: '0980094965',
  email: 'juan@example.com',
  address: 'Av. Principal 123',
  accounts: [
    { id: 'CUT482', type: 'Ahorros', number: '2285456482', balance: 25.0 },
    { id: 'CUT237', type: 'Ahorros', number: '2285456237', balance: 5.45 },
    { id: 'CUT346', type: 'Ahorros', number: '2285456346', balance: 105.04 }
  ]
}

function readState() {
  const s = localStorage.getItem('namca_state')
  if (s) return JSON.parse(s)

  const state = { user: initialUser, transactions: [] }
  localStorage.setItem('namca_state', JSON.stringify(state))
  return state
}

export function AuthProvider({ children }) {

  const [state, setState] = useState(() => {
    const saved = readState()

    const storedName = localStorage.getItem("namca_username")
    if (storedName) {
      saved.user.name = storedName
    }

    return saved
  })

  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('namca_logged'))

  useEffect(() => {
    localStorage.setItem('namca_state', JSON.stringify(state))
  }, [state])

  const login = (username, password) => {
    if (!username || !password) 
      return { ok:false, error: 'Usuario y contraseña requeridos' }

    localStorage.setItem('namca_logged', '1')
    localStorage.setItem('namca_username', username.toUpperCase())  

    setState(s => ({
      ...s,
      user: { ...s.user, name: username.toUpperCase() }
    }))

    setLoggedIn(true)
    return { ok:true }
  }

  const logout = () => {
    localStorage.removeItem('namca_logged')
    localStorage.removeItem('namca_username')
    setLoggedIn(false)
  }

  const updateUser = (patch) => {
    setState(s => ({ 
      ...s, 
      user: { ...s.user, ...patch } 
    }))
  }

  const addTransaction = (tx) => {
    setState(s => {
      const txs = [tx, ...(s.transactions || [])]
      const accounts = s.user.accounts.map(a =>
        a.id === tx.accId 
          ? { ...a, balance: Number((a.balance + tx.amount).toFixed(2)) }
          : a
      )
      return { ...s, transactions: txs, user: { ...s.user, accounts } }
    })
  }

  return (
    <AuthContext.Provider value={{
      state,
      login,
      logout,
      loggedIn,
      updateUser,
      addTransaction
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
