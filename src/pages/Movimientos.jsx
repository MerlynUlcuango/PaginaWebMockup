import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Movimientos(){
  const { state } = useAuth()
  const [filterDate, setFilterDate] = useState('')
  const transactions = state.transactions || []
  const filtered = filterDate ? transactions.filter(t => t.date === filterDate) : transactions

  return (
    <div>
      <h2>Movimientos</h2>
      <div style={{marginTop:8, marginBottom:12}}>
        <label className="small">Filtrar por fecha</label>
        <input type="date" className="input" value={filterDate} onChange={e=>setFilterDate(e.target.value)} />
      </div>

      <div className="card">
        {filtered.length===0 && <div className="small">No hay movimientos</div>}
        <ul style={{listStyle:'none', padding:0}}>
          {filtered.map(tx => (
            <li key={tx.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f3f4f6'}}>
              <div>
                <div style={{fontWeight:600}}>{tx.desc}</div>
                <div className="small">{tx.date} — {tx.name}</div>
              </div>
              <div style={{fontWeight:700}}>{tx.amount >= 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
