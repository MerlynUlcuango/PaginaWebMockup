import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Home(){
  const { state } = useAuth()
  return (
    <div>
      <div className="header-inline">
        <h1>Inicio</h1>
        <div className="small">Bienvenido, {state.user.name}</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
        {state.user.accounts.map(a => (
          <div className="card" key={a.id}>
            <div className="small">{a.type} | N°. {a.number}</div>
            <div style={{fontSize:20,fontWeight:700}}>${a.balance.toFixed(2)}</div>
            <div style={{marginTop:8}}>
              <Link to={`/movimientos`} className="small">Ver movimientos</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
