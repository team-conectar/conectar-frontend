import { Context } from '../../context/AuthContext'
import React, { useContext } from 'react'

const Logged = () => {
  const { loading, isAuthenticated } = useContext(Context)

  if (loading) {
    return <div>loading..</div>
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        zIndex: 1,
        color: 'white',
      }}
    >
      <div style={{ position: 'relative' }}>
        logado: {String(isAuthenticated)}
      </div>
    </div>
  )
}

export default Logged
