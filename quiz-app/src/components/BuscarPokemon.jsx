import { useState } from 'react'
import './BuscarPokemon.css'

export default function BuscarPokemon() {
  const [nombre, setNombre] = useState("")
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)

  const buscarPokemon = async () => {
    if (!nombre) return

    try {
      setLoading(true)

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
      const data = await response.json()

      setPokemon(data)
    } catch (error) {
      console.error('Error al buscar pokemon:', error)
      setPokemon(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pokemon-container">

      {/* HUD */}
      <h1 className="pokemon-page-title">POKEDEX.exe</h1>
      <h2 className="pokemon-titulo">Sistema de búsqueda activo</h2>
      <p className="pokemon-texto">
        Ingresa el nombre del Pokémon ⚡
      </p>

      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Ej: pikachu"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="pokemon-input"
        />

        <button onClick={buscarPokemon} className="pokemon-boton">
          {loading ? 'CARGANDO...' : 'ESCANEAR'}
        </button>
      </div>

      {/* RESULTADO */}
      {pokemon && (
        <div className="pokemon-result">
          <h3>{pokemon.name}</h3>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />

          <p>ALTURA: {pokemon.height / 10} m</p>
          <p>PESO: {pokemon.weight / 10} kg</p>
        </div>
      )}

    </section>
  )
}