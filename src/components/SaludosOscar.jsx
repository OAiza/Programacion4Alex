import { useState } from 'react'
import './SaludosOscar.css'

export default function SaludosOscar() {
  console.log('SaludosOscar component rendered');
  const [name, setName] = useState('Oscar')

  return (
    <section className="saludos-oscar-container">
      <h2 className="saludos-oscar-title">Inicio</h2>
      <h1 className="saludos-oscar-subtitle">¡Hola, {name}!</h1>
      <p className="saludos-oscar-text">
        Bienvenido al sistema gamer ⚡
      </p>

      <button
        className="saludos-oscar-button"
        onClick={() => setName(name === 'Alex' ? 'Oscar' : 'Alex')}
      >
        Cambiar nombre
      </button>
    </section>
  )
}