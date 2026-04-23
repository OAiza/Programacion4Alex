import { useEffect } from 'react'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'

import SaludosOscar from './Components/SaludosOscar'
import Quiz from './Components/Quiz'
import BuscarPokemon from './Components/BuscarPokemon'

/* =========================
   🎮 ROOT LAYOUT
========================= */
const rootRoute = createRootRoute({
  component: function RootLayout() {
    const location = useLocation()

    useEffect(() => {
      const path = location.pathname

      if (path === '/quiz') {
        document.title = 'QUIZ.exe'
      } else if (path === '/pokemon') {
        document.title = 'POKEDEX.exe'
      } else {
        document.title = 'OSCAR SYSTEM'
      }
    }, [location.pathname])

    return (
      <>
        {/* 🎮 NAVBAR IZQUIERDA */}
        <nav className="navbar">
          <div className="navbar-inner">

            <Link
              to="/"
              className="nav-button"
              activeProps={{ className: "nav-button active" }}
            >
              Inicio
            </Link>

            <Link
              to="/quiz"
              className="nav-button"
              activeProps={{ className: "nav-button active" }}
            >
              Quiz
            </Link>

            <Link
              to="/pokemon"
              className="nav-button"
              activeProps={{ className: "nav-button active" }}
            >
              Pokémon
            </Link>

          </div>
        </nav>

        {/* 📦 CONTENIDO */}
        <section id="content">
          <Outlet />
        </section>
      </>
    )
  },
})

/* =========================
   📄 RUTAS
========================= */

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SaludosOscar,
})

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz',
  component: Quiz,
})

const pokemonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pokemon',
  component: BuscarPokemon,
})

/* =========================
   🚀 ROUTER
========================= */

const routeTree = rootRoute.addChildren([
  indexRoute,
  quizRoute,
  pokemonRoute,
])

export const router = createRouter({
  routeTree,
})