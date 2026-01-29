import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <nav className="navigation">
      <Link 
        to="/todos" 
        className={location.pathname === '/todos' ? 'active' : ''}
      >
        Todos
      </Link>
      <Link 
        to="/posts" 
        className={location.pathname === '/posts' ? 'active' : ''}
      >
        Posts
      </Link>
    </nav>
  )
}

export default Navigation
